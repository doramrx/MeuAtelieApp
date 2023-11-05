import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

import { THEME } from "../theme";

import { Order, OrderType } from "../entities/Order";
import { useAgendaViewModel } from "../view-models/useAgendaViewModel";
import { useAppContext } from "../hooks/useAppContext";

interface SelectedOrder {
  orderId: number;
  orderType: OrderType;
  finished: boolean;
}

export interface AgendaData {
  orders: Order[];
  markedDates: MarkedDates | undefined;
  selectedDay: number | null;
  isModalOpen: boolean;
  selectedOrder: SelectedOrder | null;
  onMonthChange: (date: DateData) => void;
  onSelectDay: (date: DateData) => void;
  onSelectOrder: (
    orderId: number,
    orderType: OrderType,
    finished: boolean
  ) => void;
  onFinishOrder: () => void;
}

export function useAgendaViewController(): AgendaData {
  const viewModel = useAgendaViewModel();

  const { isModalOpen } = useAppContext();

  const currentMonthRef = useRef<number>();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markedDates, setMarkedDates] = useState<MarkedDates>();
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrder | null>(
    null
  );

  async function onMonthChange(date: DateData) {
    currentMonthRef.current = date.month;
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

  function onSelectOrder(
    orderId: number,
    orderType: OrderType,
    finished: boolean
  ) {
    setSelectedOrder({ orderId, orderType, finished });
  }

  function onFinishOrder() {
    if (currentMonthRef.current) {
      viewModel.fetchOrderByMonth(currentMonthRef.current);
    } else {
      viewModel.fetchOrderByMonth(new Date().getMonth() + 1);
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

        viewModel.orders.forEach((order) => {
          const key = order.dueDate.toISOString().split("T")[0];

          markedDates[key] = {
            today: true,
            marked: true,
            selectedColor: THEME.COLORS.PINK.V2,
            selectedTextColor: THEME.COLORS.WHITE.FULL_WHITE,
            dotColor: THEME.COLORS.PINK.V2,
          };
        });

        return markedDates;
      });
    }, [viewModel.orders])
  );

  return {
    orders: viewModel.orders,
    selectedDay,
    isModalOpen,
    markedDates,
    selectedOrder,
    onMonthChange,
    onSelectDay,
    onSelectOrder,
    onFinishOrder,
  };
}
