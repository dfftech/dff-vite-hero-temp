import { DatePicker } from "@heroui/date-picker";
import { now, getLocalTimeZone } from "@internationalized/date";

interface DateProps {
  className?: string;
  isDateTimeEnabled?: boolean;
}

const TypeDatePicker: React.FC<DateProps> = ({
  className,
  isDateTimeEnabled = false,
}: DateProps) => {
  return (
    <DatePicker
      className={className}
      radius="full"
      hideTimeZone={!isDateTimeEnabled}
      showMonthAndYearPickers
      defaultValue={isDateTimeEnabled ? now(getLocalTimeZone()) : undefined}
    />
  );
};

export default TypeDatePicker;
