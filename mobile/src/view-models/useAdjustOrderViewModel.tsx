import { useCallback, useState } from "react";
import {
  CreateAdjustOrderData,
  useAdjustOrderModel,
} from "../models/useAdjustOrderModel";
import { AdjustOrder } from "../entities/Order";
import { useOrderAdapter } from "../adapters/orderAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface AdjustOrderData {
  adjustOrder: AdjustOrder | null;
  createAdjustOrder: (orderData: CreateAdjustOrderData) => Promise<boolean>;
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
        return Promise.reject("Nenhum item foi informado!");
      }

      await model.createAdjustOrder(orderData);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function fetchAdjustOrder(): Promise<void> {
    if (!orderId) {
      return Promise.reject();
    }

    try {
      const rawAdjustOrder = await model.getAdjustOrderById(orderId);

      if (rawAdjustOrder.length > 0) {
        setAdjustOrder(adapter.mapToAdjustOrderEntity(rawAdjustOrder));
      }
    } catch {
      return Promise.reject();
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (shouldFetchData) {
        fetchAdjustOrder();
      }
    }, [orderId])
  );

  return {
    adjustOrder,
    createAdjustOrder,
  };
}
