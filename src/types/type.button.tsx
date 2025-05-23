import React from "react";
import { LucideIcon, icons } from "lucide-react"; // Using Lucide React
import { Button } from "@heroui/button";

type IconName = keyof typeof icons;

interface ButtonProps {
  label: string | undefined;
  name?: IconName;
  onPress?: () => void;
  variant?:
  | "solid"
  | "faded"
  | "bordered"
  | "light"
  | "flat"
  | "ghost"
  | "shadow";
  action?:
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "default"
  | "warning";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
}

const TypeButton: React.FC<ButtonProps> = ({
  name,
  label,
  onPress,
  variant = "solid",
  action = "primary",
  className = "",
  disabled = false,
  isLoading = false,
  radius = "full",
}: ButtonProps) => {
  const IconComponent: LucideIcon | null = name ? icons[name] : null;

  return (
    <Button
      className={className}
      color={action}
      disabled={disabled}
      isLoading={isLoading}
      radius={radius}
      variant={variant}
      onPress={onPress}
    >
      {IconComponent && <IconComponent size={18} />}
      {label && <span>{label}</span>}
    </Button>
  );
};

export default TypeButton;
