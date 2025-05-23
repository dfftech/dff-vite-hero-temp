import { Controller, useForm } from "react-hook-form";
import { I18nManager } from "react-native";
import { DatePicker } from "@heroui/date-picker";

interface DateProps {
  open: boolean;
  date: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  className?: string;
}

const TypeDatePicker: React.FC<DateProps> = ({
  open,
  date,
  className,
  onConfirm,
  onCancel,
}: DateProps) => {
  return (
    <DatePicker
      className={className}
    // modal
    // mode="date"
    // locale={I18nManager.isRTL ? "ar" : "en"}
    // minimumDate={date}
    // open={open}
    // date={date}
    // onConfirm={onConfirm}
    // onCancel={onCancel}
    />
  );
};
export default TypeDatePicker;
