import { Controller } from "react-hook-form";
import { Input, Textarea } from "@heroui/input";
import { useEffect, useState } from "react";
import { t } from "@/i18n";

type TypeProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: string | number | undefined;
  rules?: any;
  error?: any;
  className?: string;
  type?:
    | "text"
    | "password"
    | "number"
    | "datetime-local"
    | "textarea"
    | "time";
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
  onChange?: (value: any) => void;
};

export const TypeInput = ({
  control,
  name,
  label,
  value = "",
  rules = {},
  error,
  className = "flex flex-col w-full",
  type = "text",
  disabled = false,
  onChange,
  radius = "full",
}: TypeProps) => {
  const [inputValue, setInputValue] = useState<string | number | undefined>("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium p-2">
          {label} {rules.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        control={control}
        defaultValue={inputValue}
        name={name}
        render={({ field }: any) =>
          type === "textarea" ? (
            <Textarea
              {...field}
              className={className}
              disabled={disabled}
              radius={radius}
              onChange={(e) => {
                field.onChange(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
            />
          ) : (
            <Input
              {...field}
              className={className}
              disabled={disabled}
              type={type}
              radius={radius}
              onChange={(e) => {
                field.onChange(
                  type === "number" ? Number(e.target.value) : e.target.value
                );
                if (onChange) onChange(e.target.value);
              }}
            />
          )
        }
        rules={rules}
      />
      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </section>
  );
};
