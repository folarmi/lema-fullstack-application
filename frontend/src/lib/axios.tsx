/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Single request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = `Bearer ${token}jjjj`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const protectedRoutes = [
      `auth/${import.meta.env.VITE_KEY_CLOAK}/token`,
      "appointment/api/doctors/create-account",
      "appointment/api/patients/create-account",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    const is401 = error.response?.status === 401;
    const isRetry = originalRequest._retry;
    const isProtected = isProtectedRoute;

    if (is401 && !isRetry && !isProtected) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // console.log("Already refreshing, queueing request...");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const params = new URLSearchParams();
        params.append("client_id", import.meta.env.VITE_CLIENT_ID);
        params.append("client_secret", "a1CrgMpknrBzYV4hRGTmcgcgS7TgDT9S");
        params.append("grant_type", import.meta.env.VITE_REFRESH_TOKEN);
        params.append("token", refreshToken);

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}auth/${
            import.meta.env.VITE_KEY_CLOAK
          }/token`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token, refresh_token: newRefreshToken } = response.data;

        sessionStorage.setItem("token", access_token);
        if (newRefreshToken) {
          sessionStorage.setItem("refreshToken", newRefreshToken);
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        processQueue(null, access_token);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access_token}`,
        };

        return api(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
