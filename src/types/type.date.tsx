import { Controller } from "react-hook-form";
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, parseAbsolute } from "@internationalized/date";

import { t } from "@/i18n";

type TypeDateProps = {
  control: any;
  name: string;
  label?: string;
  rules?: any;
  error?: any;
  className?: string;
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg";
  isDateTimeEnabled?: boolean;
  onChange?: (value: Date) => void;
};

export const TypeDate = ({
  control,
  name,
  label,
  rules = {},
  error,
  className = "flex flex-col w-full",
  disabled = false,
  radius = "full",
  isDateTimeEnabled = false,
  onChange,
}: TypeDateProps) => {
  const localTZ = getLocalTimeZone();

  const normalizeToDateValue = (input: any) => {
    try {
      if (input && typeof input === "object" && "toDate" in input) {
        return input; // Already a DateValue
      } else if (input instanceof Date) {
        return parseAbsolute(input.toISOString(), localTZ);
      } else if (typeof input === "string") {
        return parseAbsolute(input, localTZ);
      } else {
        return parseAbsolute(new Date().toISOString(), localTZ);
      }
    } catch (e) {
      return parseAbsolute(new Date().toISOString(), localTZ);
    }
  };

  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium p-2">
          {label}
          {rules.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        control={control}
        defaultValue={parseAbsolute(new Date().toISOString(), localTZ)}
        name={name}
        render={({ field }) => {
          const safeValue = normalizeToDateValue(field.value);

          return (
            <DatePicker
              showMonthAndYearPickers
              className={className}
              hideTimeZone={!isDateTimeEnabled}
              isDisabled={disabled}
              radius={radius}
              value={safeValue}
              onChange={(calendarDateTime: any) => {
                const jsDate = calendarDateTime?.toDate?.(localTZ);
                field.onChange(jsDate);
                if (onChange) onChange(jsDate);
              }}
            />
          );
        }}
        rules={rules}
      />

      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </section>
  );
};

export default TypeDate;
