import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction } from "react";

interface DatePickerData {
  openDatePicker: () => void;
}

interface Props {
  someDate: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export function useDatePicker({ someDate, setDate }: Props): DatePickerData {
  function openDatePicker() {
    DateTimePickerAndroid.open({
      value: someDate,
      onChange: (_, _date) => {
        _date && setDate(_date);
      },
      mode: "date",
      minimumDate: new Date(),
    });
  }

  return {
    openDatePicker,
  };
}
