import { Switch } from "@heroui/react";
import { Controller } from "react-hook-form";

type TypeProps = {
  control: any;
  name: string;
  label?: string;
  className?: string;
  variant?: "square" | "circular";
  disabled?: boolean;
};

export const TypeSwitch = ({
  control,
  name,
  label,
  className = "flex w-full",
  disabled = false,
}: TypeProps) => {
  return (
    <section className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch
            {...field}
            className={className}
            disabled={disabled}
            isSelected={field.value || false}
            onValueChange={(checked: boolean) => field.onChange(checked)}
          >
            {label}
          </Switch>
        )}
      />
    </section>
  );
};
