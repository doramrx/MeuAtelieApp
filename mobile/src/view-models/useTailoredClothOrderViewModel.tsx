import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { TailoredClothOrder } from "../entities/Order";

import { useOrderAdapter } from "../adapters/orderAdapter";
import {
  CreateTailoredOrderData,
  useTailoredClothOrderModel,
} from "../models/useTailoredClothOrderModel";

interface TailoredClothOrderData {
  tailoredClothOrder: TailoredClothOrder | null;
  createNewOrder: (orderData: CreateTailoredOrderData) => Promise<boolean>;
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
  };
}
