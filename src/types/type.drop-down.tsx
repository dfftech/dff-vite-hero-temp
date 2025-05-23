import { Controller } from "react-hook-form";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

import { TypeIcon } from "./type.icon";

interface DropdownInputProps {
  label: string;

  value: string | string[];
  onSelect?: (value: string[] | { id: string; nameLang: any }) => void;
  placeholder: string;
  required?: boolean;
  control?: any;
  name?: string;
  className?: string;
  options?: { id: string; nameLang: any }[];
  multiSelect?: boolean;
}

export const DropdownInput = ({
  label,
  value,
  onSelect,
  placeholder,
  className,
  required,
  control,
  name,
  options = [],
  multiSelect = false,
}: DropdownInputProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : [],
  );

  const handleSelect = (item: { id: string; nameLang: any }) => {
    let newValues;

    if (multiSelect) {
      if (selectedValues.includes(item.id)) {
        newValues = selectedValues.filter((val) => val !== item.id);
      } else {
        newValues = [...selectedValues, item.id];
      }
    } else {
      newValues = [item.id];
    }
    setSelectedValues(newValues);
    if (onSelect) onSelect(multiSelect ? newValues : item);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Controller
        control={control}
        defaultValue={multiSelect ? selectedValues : selectedValues[0] || ""}
        name={name || ""}
        render={({ field: { onChange } }) => (
          <Dropdown>
            <DropdownTrigger>
              <button className={className} type="button">
                <span
                  className={
                    selectedValues.length ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {multiSelect
                    ? selectedValues
                      .map(
                        (val) =>
                          options.find((o) => o.id === val)?.nameLang?.[
                          "en-US"
                          ],
                      )
                      .join(", ")
                    : options.find((o) => o.id === selectedValues[0])
                      ?.nameLang?.["en-US"] || placeholder}
                </span>
                <TypeIcon name="ChevronDown" />
              </button>
            </DropdownTrigger>
            <DropdownMenu className="absolute z-10 w-full bg-white shadow-lg rounded-lg">
              {options.map((item) => (
                <DropdownItem
                  key={item.id}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${selectedValues.includes(item.id) ? "bg-blue-100" : ""
                    }`}
                  onClick={() => {
                    handleSelect(item);
                    onChange(multiSelect ? selectedValues : item.id);
                  }}
                >
                  {multiSelect && (
                    <input
                      readOnly
                      checked={selectedValues.includes(item.id)}
                      className="w-4 h-4"
                      type="checkbox"
                    />
                  )}
                  {item?.nameLang?.["en-US"] ?? item.id}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      />
    </div>
  );
};
