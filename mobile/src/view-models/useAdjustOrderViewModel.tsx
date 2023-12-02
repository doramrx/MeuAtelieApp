import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  CreateAdjustOrderData,
  useAdjustOrderModel,
} from "../models/useAdjustOrderModel";
import { AdjustOrder, AdjustOrderItem } from "../entities/Order";
import { useOrderAdapter } from "../adapters/orderAdapter";

export interface AdjustOrderData {
  adjustOrder: AdjustOrder | null;
  createAdjustOrder: (orderData: CreateAdjustOrderData) => Promise<boolean>;
  fetchAdjustOrder: () => Promise<void>;
  getAdjustOrder: () => Promise<AdjustOrder>;
  updateAdjustOrder: (
    dueDate: Date,
    orderItems: AdjustOrderItem[],
    orderId: number
  ) => Promise<void>;
}

interface ViewModelArgs {
  orderId?: number;
  shouldFetchData?: boolean;
}

export function useAdjustOrderViewModel({
  orderId,
  shouldFetchData = true,
}: ViewModelArgs): AdjustOrderData {
  const model = useAdjustOrderModel();
  const adapter = useOrderAdapter();

  const [adjustOrder, setAdjustOrder] = useState<AdjustOrder | null>(null);

  async function createAdjustOrder(
    orderData: CreateAdjustOrderData
  ): Promise<boolean> {
    try {
      if (orderData.orderItems.length === 0) {
        console.log("[ViewModel] rejecting on createAdjustOrder");
        return Promise.reject("Nenhum item foi informado!");
      }

      await model.createAdjustOrder({
        ...orderData,
        orderItems: orderData.orderItems.map((item) => {
          return {
            ...item,
            adjusts: item.adjusts.filter((adjust) => adjust.checked),
          };
        }),
      });

      return Promise.resolve(true);
    } catch (error) {
      console.log("[ViewModel] rejecting on createAdjustOrder (catch)");
      return Promise.reject(error);
    }
  }

  async function fetchAdjustOrder(): Promise<void> {
    if (!orderId) {
      console.log("[ViewModel] rejecting on fetchAdjustOrder");
      return Promise.reject();
    }

    try {
      const rawAdjustOrder = await model.getAdjustOrderById(orderId);

      if (rawAdjustOrder.length > 0) {
        const order = adapter.mapToAdjustOrderEntity(rawAdjustOrder);

        setAdjustOrder(order);
        console.log("[ViewModel] Adjust order data fetched successfully!");
      }
    } catch (error) {
      console.log("[ViewModel] rejecting on fetchAdjustOrder [catch]");
      return Promise.reject();
    }
  }

  async function getAdjustOrder(): Promise<AdjustOrder> {
    if (!orderId) {
      console.log("[ViewModel] rejecting on fetchAdjustOrder");
      return Promise.reject();
    }

    try {
      const rawAdjustOrder = await model.getAdjustOrderById(orderId);
      const order = adapter.mapToAdjustOrderEntity(rawAdjustOrder);
      return Promise.resolve(order);
    } catch (error) {
      console.log("[ViewModel] rejecting on fetchAdjustOrder [catch]");
      return Promise.reject();
    }
  }

  async function updateAdjustOrder(
    dueDate: Date,
    orderItems: AdjustOrderItem[]
  ): Promise<void> {
    if (!orderId) {
      return Promise.reject();
    }

    return model.updateAdjustOrder({
      dueDate,
      items: orderItems,
      orderId,
    });
  }

  useFocusEffect(
    useCallback(() => {
      if (shouldFetchData) {
        console.log("[ViewModel] fetchAdjustOrder use focus effect");
        fetchAdjustOrder();
      }
    }, [orderId])
  );

  return {
    fetchAdjustOrder,
    adjustOrder,
    createAdjustOrder,
    getAdjustOrder,
    updateAdjustOrder,
  };
}
