import { Controller } from "react-hook-form";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { OptionType } from "dff-util";

import { trans } from "@/i18n";

type TypeProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: string | number | string[];
  rules?: any;
  error?: any;
  className?: string;
  options: OptionType[];
  disabled?: boolean;
  multiSelect?: boolean;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  onChange?: (value: string | string[]) => void;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
};

export const TypeSelect = ({
  control,
  name,
  label,
  value,
  rules = {},
  error,
  className = "flex flex-col w-full",
  options = [] as OptionType[],
  disabled = false,
  multiSelect = false,
  variant = "bordered",
  onChange,
  radius = "full",
}: TypeProps) => {
  useSignals();

  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value.toString()] : [],
  );

  useEffect(() => {
    setSelectedValues(
      Array.isArray(value) ? value : value ? [value.toString()] : [],
    );
  }, [value]);

  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {rules?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Controller
        control={control}
        defaultValue={value}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            className={className}
            disabled={disabled}
            multiple={multiSelect} // Enables multi-select mode
            radius={radius}
            value={multiSelect ? selectedValues : selectedValues[0] || ""}
            variant={variant}
            onSelectionChange={(selected: any) => {
              let newValues: any;

              if (multiSelect) {
                newValues = selectedValues.includes(selected)
                  ? selectedValues.filter((val) => val !== selected)
                  : [...selectedValues, selected];
              } else {
                newValues = [selected];
              }

              setSelectedValues(newValues);
              field.onChange(multiSelect ? newValues : selected);
              if (onChange) {
                onChange(multiSelect ? newValues : selected);
              }
            }}
          >
            {options.map((option: OptionType) => (
              <SelectItem key={option.key} isDisabled={option.disabled}>
                {trans(option.lang, option.label)}
              </SelectItem>
            ))}
          </Select>
        )}
        rules={rules}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </section>
  );
};
