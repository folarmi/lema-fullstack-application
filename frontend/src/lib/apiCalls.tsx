import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "../lib/axios";
import {
  getApiErrors,
  showErrorToast,
  showSuccessToast,
} from "../utils/toastUtils";

interface MutationResponse<T = unknown> {
  status: number;
  data: {
    remark: string;
  } & T;
}

// Query hook options with stricter types
interface UseDataOptions<TResponse>
  extends Omit<UseQueryOptions<TResponse, AxiosError>, "queryKey" | "queryFn"> {
  url: string;
  queryKey: string[];
  enabled?: boolean;
}

// Custom mutation config with additional metadata
interface CustomMutationOptions<
  TData,
  TError = AxiosError,
  TVariables = void,
  TContext = unknown
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  endpoint: string | ((variables: TVariables) => string);
  method?: "get" | "post" | "put" | "patch" | "delete";
  successMessage?: (data: TData) => string;
  errorMessage?: (error: TError) => string | void;
  onSuccessCallback?: (data: TData) => void;
  contentType?: "application/x-www-form-urlencoded" | "application/json";
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >;
}

// Typed mutation hook
export const useCustomMutation = <
  TData = MutationResponse,
  TError = AxiosError,
  TVariables = Record<string, unknown>,
  TContext = unknown
>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const {
    endpoint,
    successMessage,
    errorMessage,
    onSuccessCallback,
    contentType = "application/json",
    method = "post",
    ...mutationOptions
  } = options;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;

      const response = await api[method]<TData>(resolvedEndpoint, variables, {
        headers: {
          "Content-Type": contentType,
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      if (successMessage) {
        showSuccessToast(successMessage(data));
      }
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      try {
        const message =
          errorMessage?.(error) ||
          getApiErrors(error) ||
          "An unexpected error occurred";
        showErrorToast(message);
      } catch {
        showErrorToast("Failed to process error");
      }
    },
    ...mutationOptions,
  });
};

// Typed query hook
export const useGetData = <TResponse = unknown,>({
  url,
  queryKey,
  enabled = true,
  ...rest
}: UseDataOptions<TResponse>): UseQueryResult<TResponse, AxiosError> => {
  return useQuery<TResponse, AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<TResponse>(url);
      return response.data;
    },
    enabled,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...rest,
  });
};
