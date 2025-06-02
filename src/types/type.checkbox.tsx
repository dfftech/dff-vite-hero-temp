import { Checkbox } from "@heroui/react";
import { Controller } from "react-hook-form";

type TypeProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: boolean;
  rules?: any;
  error?: any;
  className?: string;
  type?: "before" | "after";
  variant?: "square" | "circular";
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
};

export const TypeCheckbox = ({
  control,
  name,
  label,
  value = false,
  rules = {},
  className = "flex flex-col w-full",
  type = "after",
  variant = "square",
  disabled = false,
  radius = "none",
}: TypeProps) => {
  return (
    <section className={className}>
      <Controller
        control={control}
        defaultValue={value}
        name={name}
        render={({ field }: any) => (
          <Checkbox
            {...field}
            checked={field.value}
            className={className}
            disabled={disabled}
            label={label}
            labelPosition={type}
            shape={variant}
            radius={radius}
            />
        )}
        rules={rules}
      />
    </section>
  );
};
