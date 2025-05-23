import React from "react";
import { LucideIcon, icons } from "lucide-react"; // Using Lucide React
import { Button } from "@heroui/button";

type IconName = keyof typeof icons;

interface ButtonProps {
  label: string;
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
}: ButtonProps) => {
  const IconComponent: LucideIcon | null = name ? icons[name] : null;

  return (
    <Button
      className={className}
      color={action}
      disabled={disabled}
      isLoading={isLoading}
      variant={variant}
      onPress={onPress}
    >
      {IconComponent && <IconComponent size={18} />}
      <span>{label}</span>
    </Button>
  );
};

export default TypeButton;
