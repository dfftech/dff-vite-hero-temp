import { TimeInput } from "@heroui/react";
import { Controller } from "react-hook-form";
import { parseTime, Time } from "@internationalized/date";

type TypeTimeProps = {
  control: any;
  name: string;
  label?: string;
  rules?: any;
  error?: any;
  granularity?: "hour" | "minute" | "second";
  className?: string;
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg";
  type?: 12 | 24;
  onChange?: (value: string) => void;
};

export const TypeTime = ({
  control,
  name,
  label,
  rules = {},
  error,
  granularity = "minute",
  className = "flex flex-col w-full max-w-[200px]",
  disabled = false,
  radius = "full",
  type = 24,
  onChange,
}: TypeTimeProps) => {
  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium px-1 mb-1">
          {label} {rules.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => {
          const parsedValue = field.value ? parseTime(field.value) : undefined;

          return (
            <TimeInput
              hideTimeZone
              aria-label={label}
              granularity={granularity}
              hourCycle={type === 12 ? 12 : 24}
              isDisabled={disabled}
              radius={radius}
              value={parsedValue}
              onChange={(t: Time | null) => {
                const timeStr = t?.toString() ?? "00:00:00";
                field.onChange(timeStr);
                onChange?.(timeStr);
              }}
            />
          );
        }}
        rules={rules}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </section>
  );
};
