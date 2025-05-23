import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@heroui/input";
import { AlertTriangle } from "lucide-react";

type InputProps = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
  value?: string;
  className?: string;
  error?: any;
};

const TypePassword: React.FC<InputProps> = ({
  control,
  name,
  label,
  placeholder,
  rules,
  value,
  error,
  className = "w-full",
}: InputProps) => {
  return (
    <div className={className}>
      <div>
        {label && (
          <label className="text-sm font-medium" htmlFor={name}>
            {label}
            {rules?.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <Controller
          control={control}
          defaultValue={value}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              ref={ref}
              className={className}
              id={name}
              placeholder={placeholder}
              type="password"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          rules={rules}
        />

        {error && (
          <div className="flex items-center text-red-500 text-xs mt-1">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypePassword;
