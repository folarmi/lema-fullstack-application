import React from "react";
import clsx from "clsx";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { FormData } from "../utils/types";

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: keyof FormData;
  control: Control<FormData>;
  type?: string;
  rules?: UseControllerProps<FormData>["rules"];
  label?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  togglePassword?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  required,
  className,
  textarea,
  leftIcon,
  type,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController<FormData>({
    name,
    control,
    rules,
  });

  const baseClasses = clsx(
    "w-full px-4 py-2 rounded-lg border focus:outline-none  placeholder-text-gray_400 text-sm",
    error ? "border-red-500" : "border-gray-300",
    leftIcon && "pl-10",
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-lg font-medium text-gray_600">
          {label}
          {required && <span className="text-blue_60 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {textarea ? (
          <textarea
            className={baseClasses}
            required={required}
            rows={6}
            {...field}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={type}
            className={baseClasses}
            required={required}
            {...props}
            {...field}
            {...props}
            value={field.value || ""}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};
