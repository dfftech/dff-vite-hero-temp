import { Controller } from "react-hook-form";
import { DatePicker } from "@heroui/date-picker";
import {
  CalendarDateTime,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { useEffect, useState } from "react";

import { t } from "@/i18n";

type TypeDateProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: Date;
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
  const [dateValue, setDateValue] = useState<string>();

  useEffect(() => {
    console.log(value);
    setDateValue(
      value ? new Date(value).toISOString() : new Date().toISOString()
    );
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
        defaultValue={parseAbsoluteToLocal(
          dateValue || new Date().toISOString()
        )}
        name={name}
        render={({ field }: any) => (
          <DatePicker
            {...field}
            showMonthAndYearPickers
            className={className}
            disabled={disabled}
            hideTimeZone={!isDateTimeEnabled}
            radius={radius}
            onChange={(value: CalendarDateTime) => {
              const date = value.toDate(getLocalTimeZone());
              field.onChange(parseAbsoluteToLocal(date.toISOString()));
              if (onChange) onChange(date);
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
