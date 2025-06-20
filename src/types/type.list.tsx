import { trans } from "@/i18n";
import { Listbox, ListboxItem } from "@heroui/react";
import { OptionType } from "dff-util";
import { Controller } from "react-hook-form";

type TypeListProps = {
  control: any;
  name: string;
  label?: string;
  rules?: any;
  error?: any;
  options: OptionType[];
  disabled?: boolean;
  className?: string;
  selectionMode?: "single" | "multiple";
  disallowEmptySelection?: boolean;
  variant?: "flat" | "bordered" | "light" | "faded" | "shadow";
  onChange?: (value: string | string[]) => void;
};

export const TypeList = ({
  control,
  name,
  label,
  disabled = false,
  rules = {},
  error,
  options = [],
  className = "flex flex-col",
  selectionMode = "single",
  disallowEmptySelection = false,
  variant = "flat",
  onChange,
}: TypeListProps) => {
  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium px-1 mb-1">{label}</label>
      )}
      <div
        style={{
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "250px",
        }}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            const isMultiple = selectionMode === "multiple";
            const selectedKeys = isMultiple
              ? new Set(field.value || [])
              : new Set(field.value ? [field.value] : []);

            const handleSelectionChange = (keys: any) => {
              const selected = Array.from(keys);
              const newValue = isMultiple ? selected : (selected[0] ?? "");

              field.onChange(newValue);
              if (onChange) onChange(newValue as any);
            };

            return (
              <Listbox
                aria-label={label}
                disallowEmptySelection={disallowEmptySelection}
                selectedKeys={selectedKeys}
                selectionMode={selectionMode}
                variant={variant}
                onSelectionChange={handleSelectionChange}
              >
                {options.map((option) => (
                  <ListboxItem key={option.key} isDisabled={disabled || option.disabled} >
                    {trans(option.lang, option.label)}
                  </ListboxItem>
                ))}
              </Listbox>
            );
          }}
          rules={rules}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </section>
  );
};
