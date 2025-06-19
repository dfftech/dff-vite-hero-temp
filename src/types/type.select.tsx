import { Controller } from "react-hook-form";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";

export type TypeOptions = {
  key: string;
  label: string;
  active?: boolean;
};

type TypeProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: string | number | string[];
  rules?: any;
  error?: any;
  className?: string;
  options: TypeOptions[];
  disabled?: boolean;
  multiSelect?: boolean;
  varient?: "flat" | "bordered" | "underlined" | "faded";
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
  options = [],
  disabled = false,
  multiSelect = false,
  varient = "bordered",
  onChange,
  radius = "full",
}: TypeProps) => {
  useSignals();

  const [selectedValues, setSelectedValues] = useState<string[] | string>(
    Array.isArray(value) ? value : value ? [value.toString()] : []
  );

  useEffect(() => {
    setSelectedValues(
      Array.isArray(value) ? value : value ? [value.toString()] : []
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
        name={name}
        defaultValue={value}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            className={className}
            disabled={disabled}
            // isRequired={isRequired}
            // multiple={multiSelect}
            selectionMode={multiSelect ? "multiple" : "single"}
            variant={varient}
            radius={radius}
            value={multiSelect ? selectedValues : selectedValues[0] || ""}
            defaultSelectedKeys={selectedValues}
            onSelectionChange={(selected: any) => {
              let newValues: any;

              if (multiSelect) {
                const selectedKeys = Array.from(selected);
                console.log(selectedKeys);
                setSelectedValues([selectedKeys]);
                newValues = selectedKeys;
              } else {
                const selectedKey = selected?.currentKey ?? selected;
                setSelectedValues(selectedKey);
                newValues = selectedKey;
              }

              field.onChange(newValues);
              if (onChange) {
                onChange(newValues);
              }
            }}
          >
            {options.map((option: TypeOptions) => (
              <SelectItem
                key={option.key}
                value={option.key}
                disableAnimation={!option.active}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </section>
  );
};
