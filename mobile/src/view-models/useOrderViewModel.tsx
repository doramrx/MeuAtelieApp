import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Order } from "../entities/Order";
import { useOrderModel } from "../models/useOrderModel";
import { useOrderAdapter } from "../adapters/orderAdapter";

interface OrderViewModelData {
  orders: Order[];
  finishOrder: (orderId: number) => Promise<boolean>;
  orderFinished: (orderId: number) => Promise<boolean>;
}

interface ViewModelArgs {
  shouldFetchData?: boolean;
}

export function useOrderViewModel({
  shouldFetchData = true,
}: ViewModelArgs): OrderViewModelData {
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

  async function finishOrder(orderId: number): Promise<boolean> {
    try {
      await model.finishOrder(orderId);
      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }

  async function orderFinished(orderId: number) {
    return await model.isOrderFinished(orderId);
  }

  useFocusEffect(
    useCallback(() => {
      if (shouldFetchData && shouldFetchData) {
        getOrders();
      }
    }, [])
  );

  return {
    orders,
    finishOrder,
    orderFinished,
  };
}
