import { useState } from "react";

import { Order } from "../entities/Order";

import { useOrderAdapter } from "../adapters/orderAdapter";

import { useOrderModel } from "../models/useOrderModel";

interface AgendaData {
  orders: Order[];
  fetchOrderByMonth: (month: number) => void;
}

export function useAgendaViewModel(): AgendaData {
  const model = useOrderModel();
  const adapter = useOrderAdapter();

  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrderByMonth(month: number): Promise<void> {
    try {
      const rawOrderData = await model.getOrdersByMonth(month);
      setOrders(adapter.mapToOrderEntityList(rawOrderData));
    } catch {
      return Promise.reject();
    }
  }

  return {
    orders,
    fetchOrderByMonth,
  };
}
