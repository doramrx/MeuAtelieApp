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
        // printOrder();
      }
    } catch (error) {
      console.log("[ViewModel] rejecting on fetchAdjustOrder [catch]");
      return Promise.reject();
    }
  }

  // function printOrder() {
  //   console.log(`Order cost: ${adjustOrder?.cost}`);
  //   console.log(`Order created at: ${adjustOrder?.createdAt.toString()}`);
  //   console.log(`Order due date: ${adjustOrder?.dueDate.toString()}`);
  //   console.log(`Order customer name: ${adjustOrder?.customer.name}`);
  //   console.log(`Order customer phone: ${adjustOrder?.customer.phone}`);
  //   adjustOrder?.orderItems.forEach((item) => {
  //     console.log(`\tOrder item id: ${item.id}`);
  //     console.log(`\tOrder item title: ${item.title}`);
  //     console.log(`\tOrder item description: ${item.description || ""}`);
  //     item.adjusts.forEach((adjust) => {
  //       console.log(`\t\tOrder item adjust id: ${adjust.id}`);
  //       console.log(`\t\tOrder item adjust description: ${adjust.description}`);
  //       console.log(`\t\tOrder item adjust cost: ${adjust.cost}`);
  //       console.log(`\t\tOrder item adjust checked: ${adjust.checked}`);
  //       console.log("\n");
  //     });
  //     console.log("\n");
  //   });
  // }

  useFocusEffect(
    useCallback(() => {
      if (shouldFetchData) {
        console.log("[ViewModel] fetchAdjustOrder use focus effect");
        fetchAdjustOrder();
      }
    }, [orderId])
  );

  return {
    adjustOrder,
    createAdjustOrder,
  };
}
