import { DatePicker } from "@heroui/date-picker";

interface DateProps {
  className?: string;
}

const TypeDatePicker: React.FC<DateProps> = ({
  className,
}: DateProps) => {
  return (
    <DatePicker
      className={className}
      radius="full"
    />
  );
};

export default TypeDatePicker;
