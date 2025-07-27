export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray_200: "#E9EAEB",
        gray_300: "#D5D7DA",
        gray_400: "#94A3B8",
        gray_500: "#717680",
        gray_600: "#535862",
        gray_700: "#334155",
        gray_900: "#181D27",
        brand_50: "#F9F5FF",
        brand_600: "#7F56D9",
      },
      boxShadow: {
        "box-shadow":
          "0px 4px 6px rgba(10, 13, 18, 0.06), 0px 2px 4px rgba(10, 13, 18, 0.10)",
      },
      dropShadow: {
        custom: [
          "0 1px 2px rgba(0, 0, 0, 0.1)",
          "0 1px 1px rgba(0, 0, 0, 0.08)",
        ],
      },
    },
  },
  plugins: [],
};
