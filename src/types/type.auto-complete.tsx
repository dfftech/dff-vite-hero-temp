import React, { useState, useMemo } from "react";
import { Controller } from "react-hook-form";

import { TypeIcon } from "./type.icon";

type SelectProps = {
  label: string | null;
  control: any;
  name: string;
  placeholder: string;
  rules?: object;
  defaultValue?: string;
  className?: string;
  error?: any;
  options: { label: string; value: string }[];
};

const TypeAutoComplete: React.FC<SelectProps> = ({
  control,
  label,
  name,
  placeholder,
  rules,
  defaultValue,
  className = "",
  error,
  options,
}: SelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter options based on input value
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, options]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, ref } }) => (
          <div className="relative">
            {/* Input field */}
            <div className="relative w-full">
              <input
                ref={ref}
                className={className}
                placeholder={placeholder}
                type="text"
                value={inputValue}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsDropdownOpen(true);
                }}
              />
              {/* Dropdown icon */}
              <button
                className="absolute inset-y-0 right-2 flex items-center"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {/* <ChevronDownIcon className="w-5 h-5 text-gray-500" /> */}
                <TypeIcon name="ChevronDown" />
              </button>
            </div>

            {/* Dropdown list */}
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setInputValue(option.label);
                        setIsDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          onChange(option.value);
                          setInputValue(option.label);
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No options found</div>
                )}
              </div>
            )}

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            )}
          </div>
        )}
        rules={rules}
      />
    </div>
  );
};

export default TypeAutoComplete;
