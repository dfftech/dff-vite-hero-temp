import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

interface DropDownProps {
  className?: string;
  items: Array<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const TypeDropDown: React.FC<DropDownProps> = ({
  className,
  items,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Dropdown className={className}>
      <DropdownTrigger>
        {selectedValue || placeholder}
      </DropdownTrigger>
      <DropdownMenu 
        onAction={(key) => handleSelect(key as string)}
      >
        {items.map((item) => (
          <DropdownItem key={item.value}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TypeDropDown;
