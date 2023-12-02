import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Order, OrderType } from "../../entities/Order";
import { useAgendaViewModel } from "../../view-models/useAgendaViewModel";
import { useAppContext } from "../../hooks/useAppContext";
import { THEME } from "../../theme";

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

export function useViewController(): AgendaData {
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

        const ordersGroupedByDay: {
          [key: string]: {
            ordersFinished: number;
            ordersInProgress: number;
          };
        } = {};

        viewModel.orders.forEach((order) => {
          const key = order.dueDate.getDate();
          const keyExists = Object.keys(ordersGroupedByDay).includes(
            key.toString()
          );

          if (!keyExists) {
            ordersGroupedByDay[key] = {
              ordersFinished: order.finished ? 1 : 0,
              ordersInProgress: !order.finished ? 1 : 0,
            };

            return;
          }

          if (order.finished) {
            ordersGroupedByDay[key] = {
              ...ordersGroupedByDay[key],
              ordersFinished: ordersGroupedByDay[key].ordersFinished + 1,
            };
          } else {
            ordersGroupedByDay[key] = {
              ...ordersGroupedByDay[key],
              ordersInProgress: ordersGroupedByDay[key].ordersInProgress + 1,
            };
          }
        });

        viewModel.orders.forEach((order) => {
          const key = order.dueDate.toISOString().split("T")[0];
          const currentDate = order.dueDate.getDate().toString();
          const ordersGrouped = ordersGroupedByDay[currentDate];
          let markColor;

          // Only in progress orders
          if (
            ordersGrouped.ordersInProgress > 0 &&
            ordersGrouped.ordersFinished === 0
          ) {
            markColor = THEME.COLORS.PINK.V2;
          }
          // There are both in progress and finished orders
          else if (
            ordersGrouped.ordersInProgress > 0 &&
            ordersGrouped.ordersFinished > 0
          ) {
            markColor = THEME.COLORS.YELLOW;
          }
          // Only finished orders
          else {
            markColor = THEME.COLORS.GREEN;
          }

          markedDates[key] = {
            today: true,
            marked: true,
            selectedColor: markColor,
            selectedTextColor: THEME.COLORS.WHITE.FULL_WHITE,
            dotColor: markColor,
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
