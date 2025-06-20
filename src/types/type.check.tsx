import { Checkbox } from "@heroui/react";
import { Controller } from "react-hook-form";

type TypeProps = {
  control: any;
  name: string;
  label?: string;
  className?: string;
  variant?: "square" | "circular";
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg";
};

export const TypeCheck = ({
  control,
  name,
  label,
  className = "flex w-full",
  disabled = false,
  radius = "none",
}: TypeProps) => {
  return (
    <section className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            {...field}
            isSelected={field.value || false}
            className={className}
            disabled={disabled}
            radius={radius}
            onValueChange={(checked: boolean) => field.onChange(checked)}
          >
            {label}
          </Checkbox>
        )}
      />
    </section>
  );
};
