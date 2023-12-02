import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { TailoredClothOrder } from "../entities/Order";

import { useOrderAdapter } from "../adapters/orderAdapter";
import {
  CreateTailoredOrderData,
  useTailoredClothOrderModel,
} from "../models/useTailoredClothOrderModel";

export interface TailoredClothOrderData {
  tailoredClothOrder: TailoredClothOrder | null;
  createNewOrder: (orderData: CreateTailoredOrderData) => Promise<boolean>;
  fetchTailoredClothOrder: () => Promise<void>;
  getTailoredClothOrder: () => Promise<TailoredClothOrder>;
  updateTailoredClothOrder: (orderData: TailoredClothOrder) => Promise<void>;
  setTailoredClothOrder: (orderData: TailoredClothOrder | null) => void;
}

interface ViewModelArgs {
  orderId?: number;
  shouldFetchData?: boolean;
}

export function useTailoredClothOrderViewModel({
  orderId,
  shouldFetchData = true,
}: ViewModelArgs): TailoredClothOrderData {
  const model = useTailoredClothOrderModel();
  const adapter = useOrderAdapter();

  const [tailoredClothOrder, setTailoredClothOrder] =
    useState<TailoredClothOrder | null>(null);

  async function fetchTailoredClothOrder(): Promise<void> {
    if (!orderId) {
      return Promise.reject();
    }

    try {
      const rawTailoredClothes = await model.getTailoredClothOrderById(orderId);

      if (rawTailoredClothes.length > 0) {
        const tailoredClothes =
          adapter.mapToTailoredClothOrderEntity(rawTailoredClothes);

        setTailoredClothOrder(tailoredClothes);
      }
    } catch {
      return Promise.reject();
    }
  }

  async function getTailoredClothOrder(): Promise<TailoredClothOrder> {
    if (!orderId) {
      return Promise.reject();
    }

    const rawTailoredClothes = await model.getTailoredClothOrderById(orderId);
    const tailoredClothes =
      adapter.mapToTailoredClothOrderEntity(rawTailoredClothes);

    return tailoredClothes;
  }

  async function createNewOrder(
    orderData: CreateTailoredOrderData
  ): Promise<boolean> {
    try {
      await model.createTailoredClothOrder({
        ...orderData,
        customerMeasures: orderData.customerMeasures.filter(
          (customerMeasure) => customerMeasure.value !== 0
        ),
      });

      return Promise.resolve(true);
    } catch (reason) {
      return Promise.reject(reason);
    }
  }

  async function updateTailoredClothOrder(order: TailoredClothOrder) {
    if (!orderId) {
      return Promise.reject();
    }

    return await model.updateTailoredClothOrder({
      orderId,
      orderItemId: order.id,
      cost: order.cost,
      title: order.title,
      description: order.description || "",
      dueDate: order.dueDate,
      customerMeasures: order.measures,
    });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] TailoredClothOrder - useFocusEffect");
      if (shouldFetchData) {
        console.log(
          "[ViewModel] TailoredClothOrder fetching tailored cloth order..."
        );
        fetchTailoredClothOrder();
      }
    }, [orderId])
  );

  return {
    tailoredClothOrder,
    createNewOrder,
    fetchTailoredClothOrder,
    getTailoredClothOrder,
    setTailoredClothOrder,
    updateTailoredClothOrder,
  };
}
