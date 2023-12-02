import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

interface DatePickerData {
  openDateTimePicker: () => void;
}

interface Props {
  someDate: Date;
  setDate: (date: Date) => void;
}

export function useDatePicker({ someDate, setDate }: Props): DatePickerData {
  function getDate(initialDate: Date): Promise<Date> {
    return new Promise((resolve, reject) => {
      DateTimePickerAndroid.open({
        value: initialDate,
        onChange: (event, date) => {
          event.type === "set" ? resolve(date || new Date()) : reject(null);
        },
        mode: "date",
      });
    });
  }

  function getTime(initialDate: Date): Promise<number> {
    return new Promise((resolve, reject) => {
      DateTimePickerAndroid.open({
        value: initialDate,
        onChange: (event, datetime) => {
          event.type === "set"
            ? resolve(datetime?.getTime() || new Date().getTime())
            : reject(null);
        },
        mode: "time",
      });
    });
  }

  async function openDateTimePicker() {
    let selectedDate;
    try {
      selectedDate = await getDate(someDate);
      const selectedTimeInMili = await getTime(selectedDate);

      selectedDate.setTime(selectedTimeInMili);
      selectedDate.setSeconds(0);
    } catch {
      // console.log("Rejecting");
    } finally {
      if (selectedDate) {
        setDate(selectedDate);
      }
    }
  }

  return { openDateTimePicker };
}
