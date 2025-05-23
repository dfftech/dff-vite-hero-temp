import React from "react";
import { Controller } from "react-hook-form";
import { AlertTriangle } from "lucide-react";

type RadioProps = {
  control: any;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  rules?: any;
  value?: string;
  error?: any;
};

const TypeRadio: React.FC<RadioProps> = ({
  control,
  name,
  label,
  options,
  rules,
  value,
  error,
}: RadioProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-gray-700 font-medium">
          {label}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        control={control}
        defaultValue={value}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col space-y-2 mt-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  checked={value === option.value}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  type="radio"
                  value={option.value}
                  onChange={onChange}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
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
  );
};

export default TypeRadio;
