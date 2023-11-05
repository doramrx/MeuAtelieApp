import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

import { THEME } from "../theme";

import { Order } from "../entities/Order";
import { useAgendaViewModel } from "../view-models/useAgendaViewModel";

export interface AgendaData {
  orders: Order[];
  markedDates: MarkedDates | undefined;
  selectedDay: number | null;
  onMonthChange: (date: DateData) => void;
  onSelectDay: (date: DateData) => void;
}

export function useAgendaViewController(): AgendaData {
  const viewModel = useAgendaViewModel();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>();

  async function onMonthChange(date: DateData) {
    try {
      await viewModel.fetchOrderByMonth(date.month);
    } catch {
      Alert.alert("Erro", "Não foi possível buscar os pedidos!");
    }
  }

  function onSelectDay(date: DateData) {
    setMarkedDates((prevMarkedDates) => {
      if (!prevMarkedDates) {
        return prevMarkedDates;
      }

      if (!prevMarkedDates[date.dateString]) {
        return prevMarkedDates;
      }

      const markedDatesCopy = { ...prevMarkedDates };

      Object.keys(markedDatesCopy).forEach((key) => {
        if (key !== date.dateString) {
          markedDatesCopy[key].selected = false;
        } else {
          markedDatesCopy[key].selected = !markedDatesCopy[key].selected;
        }
      });

      return markedDatesCopy;
    });

    if (date.day === selectedDay) {
      setSelectedDay(null);
    } else {
      setSelectedDay(date.day);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const today = new Date();

      onMonthChange({
        month: today.getMonth() + 1,
        dateString: "",
        day: 0,
        timestamp: 0,
        year: 0,
      });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      setMarkedDates(() => {
        const markedDates: MarkedDates = {};
        const today = new Date();

        viewModel.orders.forEach((order) => {
          const key = order.dueDate.toISOString().split("T")[0];

          if (order.dueDate.getDate() === today.getDate()) {
            console.log("Today");
            setSelectedDay(today.getDate());
            markedDates[key] = {
              today: true,
              marked: true,
              selected: true,
              selectedColor: THEME.COLORS.PINK.V2,
              selectedTextColor: THEME.COLORS.WHITE.FULL_WHITE,
              dotColor: THEME.COLORS.PINK.V2,
            };
          } else {
            markedDates[key] = {
              marked: true,
              selectedColor: THEME.COLORS.PINK.V2,
              selectedTextColor: THEME.COLORS.WHITE.FULL_WHITE,
              dotColor: THEME.COLORS.PINK.V2,
            };
          }
        });

        return markedDates;
      });
    }, [viewModel.orders])
  );

  return {
    orders: viewModel.orders,
    selectedDay,
    markedDates,
    onMonthChange,
    onSelectDay,
  };
}
