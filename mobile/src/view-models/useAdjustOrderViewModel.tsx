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
        // rawAdjustOrder.forEach((rawItem) => {
        //   console.log(
        //     `adjust_service_description: ${rawItem.adjust_service_description}`
        //   );
        //   console.log(`adjust_service_id: ${rawItem.adjust_service_id}`);
        //   console.log(`customer_name: ${rawItem.customer_name}`);
        //   console.log(`customer_phone: ${rawItem.customer_phone}`);
        //   console.log(`order_cost: ${rawItem.order_cost}`);
        //   console.log(`order_created_at: ${rawItem.order_created_at}`);
        //   console.log(`order_delivered_at: ${rawItem.order_delivered_at}`);
        //   console.log(`order_due_date: ${rawItem.order_due_date}`);
        //   console.log(
        //     `order_item_description: ${rawItem.order_item_description}`
        //   );
        //   console.log(`order_item_id: ${rawItem.order_item_id}`);
        //   console.log(`order_item_title: ${rawItem.order_item_title}`);
        //   console.log(`ordered_service_cost: ${rawItem.ordered_service_cost}`);
        //   console.log(`ordered_service_id: ${rawItem.ordered_service_id}`);
        //   console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
        // });
        // console.log("################################################");
        const order = adapter.mapToAdjustOrderEntity(rawAdjustOrder);

        // order.orderItems.forEach((item) => {
        //   console.log(`item id: ${item.id}`);
        //   console.log(`item title: ${item.title}`);
        //   console.log(`item description: ${item.description}`);
        //   item.adjusts.forEach((adjust) => {
        //     console.log(`adjust id: ${adjust.id}`);
        //     console.log(`adjust description: ${adjust.description}`);
        //     console.log(`adjust cost: ${adjust.cost}`);
        //     console.log(`adjust checked: ${adjust.checked}`);
        //     console.log(`adjust orderedAdjustId: ${adjust.orderedAdjustId}`);
        //     console.log("----------------------------------------------");
        //   });
        //   console.log("=====================================================");
        // });

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
