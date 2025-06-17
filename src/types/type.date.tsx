import { Controller } from "react-hook-form";
import { DatePicker } from "@heroui/date-picker";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useEffect, useState } from "react";

import { t } from "@/i18n";

type TypeDateProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: any;
  rules?: any;
  error?: any;
  className?: string;
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
  isDateTimeEnabled?: boolean;
  onChange?: (value: any) => void;
};

export const TypeDate = ({
  control,
  name,
  label,
  value,
  rules = {},
  error,
  className = "flex flex-col w-full",
  disabled = false,
  radius = "full",
  isDateTimeEnabled = false,
  onChange,
}: TypeDateProps) => {
  const [dateValue, setDateValue] = useState<any>(undefined);

  useEffect(() => {
    setDateValue(value);
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
        defaultValue={
          dateValue || (isDateTimeEnabled ? now(getLocalTimeZone()) : undefined)
        }
        name={name}
        render={({ field }: any) => (
          <DatePicker
            {...field}
            showMonthAndYearPickers
            className={className}
            disabled={disabled}
            hideTimeZone={!isDateTimeEnabled}
            radius={radius}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
          />
        )}
        rules={rules}
      />
      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </section>
  );
};

export default TypeDate;
