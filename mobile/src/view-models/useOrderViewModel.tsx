import { useState, useCallback } from "react";

import { Order } from "../entities/Order";
import { useOrderAdapter } from "../adapters/orderAdapter";
import { useOrderModel } from "../models/useOrderModel";
import { useFocusEffect } from "@react-navigation/native";

interface OrderViewModelData {
  orders: Order[];
}

export function useOrderViewModel(): OrderViewModelData {
  const adapter = useOrderAdapter();
  const model = useOrderModel();

  const [orders, setOrders] = useState<Order[]>([]);

  async function getOrders(): Promise<void> {
    try {
      const rawOrderData = await model.getOrders();

      if (rawOrderData.length > 0) {
        const orders = adapter.mapToOrderEntityList(rawOrderData);

        setOrders(orders);
      }
    } catch {
      return Promise.reject();
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  return {
    orders,
  };
}
