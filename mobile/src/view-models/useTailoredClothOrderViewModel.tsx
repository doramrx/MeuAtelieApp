import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { TailoredClothOrder } from "../entities/Order";

import { useOrderAdapter } from "../adapters/orderAdapter";
import {
  CreateTailoredOrderData,
  CreateTailoredOrderDataResult,
  UpdateTailoredOrderData,
  useTailoredClothOrderModel,
} from "../models/useTailoredClothOrderModel";

export interface TailoredClothOrderData {
  tailoredClothOrder: TailoredClothOrder | null;
  createNewOrder: (
    orderData: CreateTailoredOrderData
  ) => Promise<CreateTailoredOrderDataResult>;
  fetchTailoredClothOrder: () => Promise<void>;
  getTailoredClothOrder: () => Promise<TailoredClothOrder>;
  updateTailoredClothOrder: (
    orderData: UpdateTailoredOrderData
  ) => Promise<void>;
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
  ): Promise<CreateTailoredOrderDataResult> {
    return await model.createTailoredClothOrder({
      ...orderData,
      customerMeasures: orderData.customerMeasures.filter(
        (customerMeasure) => customerMeasure.value !== 0
      ),
    });
  }

  async function updateTailoredClothOrder(order: UpdateTailoredOrderData) {
    if (!orderId) {
      return Promise.reject();
    }

    return await model.updateTailoredClothOrder({
      orderId,
      orderItemId: order.orderItemId,
      cost: order.cost,
      title: order.title,
      description: order.description || "",
      dueDate: order.dueDate,
      customerMeasures: order.customerMeasures,
      modelPhotos: order.modelPhotos.map((modelPhoto) => {
        const splittedURI = modelPhoto.uri.split("/");

        return {
          ...modelPhoto,
          uri: splittedURI[splittedURI.length - 1],
        };
      }),
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
