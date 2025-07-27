import React from "react";
import clsx from "clsx";
import { Loader } from "./Loader";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const CustomButton = ({
  variant = "primary",
  isLoading = false,
  children,
  onClick,
  disabled,
  className,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        "px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors",
        {
          "bg-gray_700 text-white hover:bg-gray-800": variant === "primary",
          "border border-gray-300 text-gray_700 hover:bg-gray-100":
            variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          "opacity-50 cursor-not-allowed": disabled || isLoading,
        },
        className
      )}
    >
      {children}
      {isLoading && <Loader size="sm" />}
    </button>
  );
};
