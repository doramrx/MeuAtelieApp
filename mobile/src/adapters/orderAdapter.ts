import {
  AdjustOrder,
  AdjustOrderItem,
  CustomerMeasure,
  ModelPhoto,
  Order,
  TailoredClothOrder,
} from "../entities/Order";
import { AdjustOrderRawData } from "../models/useAdjustOrderModel";
import { OrderRawData } from "../models/useOrderModel";
import { TailoredClothOrderRawData } from "../models/useTailoredClothOrderModel";

interface AdapterFunctions {
  mapToOrderEntityList: (rawData: OrderRawData[]) => Order[];
  mapToTailoredClothOrderEntity: (
    rawData: TailoredClothOrderRawData[]
  ) => TailoredClothOrder;
  mapToAdjustOrderEntity: (rawdata: AdjustOrderRawData[]) => AdjustOrder;
}

export function useOrderAdapter(): AdapterFunctions {
  function mapToOrderEntity({
    id,
    title,
    due_date,
    type,
    customer_name,
    delivered_at,
  }: OrderRawData): Order {
    const order: Order = {
      id,
      dueDate: new Date(due_date),
      items: [{ title }],
      type: type === "Tailored" ? "tailoredClothService" : "adjustService",
    };

    if (customer_name) {
      order.customer = {
        name: customer_name,
      };
    }
    order.finished = Boolean(delivered_at);

    return order;
  }

  function mapToOrderEntityList(rawData: OrderRawData[]): Order[] {
    const orders: Order[] = [];

    for (const rawOrderData of rawData) {
      if (rawOrderData.type === "Tailored") {
        orders.push(mapToOrderEntity(rawOrderData));
      } else {
        if (orders.length === 0) {
          orders.push(mapToOrderEntity(rawOrderData));
          continue;
        }

        const lastIndex = orders.length - 1;
        const lastOrderId = orders[lastIndex].id;

        if (lastOrderId === rawOrderData.id) {
          orders[lastIndex].items.push({ title: rawOrderData.title });
        } else {
          orders.push(mapToOrderEntity(rawOrderData));
        }
      }
    }

    return orders;
  }

  function mapToTailoredClothOrderEntity(
    rawData: TailoredClothOrderRawData[]
  ): TailoredClothOrder {
    const modelPhotos: ModelPhoto[] = [];
    const measures: CustomerMeasure[] = [];

    if (rawData[0].order_model_photo_id) {
      rawData.forEach((rawModalPhoto) => {
        if (modelPhotos.length === 0) {
          modelPhotos.push({
            id: rawModalPhoto.order_model_photo_id,
            filename: rawModalPhoto.order_model_photo_filename,
          });

          return;
        }

        const lastModelPhotoId = modelPhotos[modelPhotos.length - 1].id;

        if (rawModalPhoto.order_model_photo_id !== lastModelPhotoId) {
          modelPhotos.push({
            id: rawModalPhoto.order_model_photo_id,
            filename: rawModalPhoto.order_model_photo_filename,
          });
        }
      });
    }

    if (rawData[0].customer_measure_id) {
      rawData.forEach((rawMeasure) => {
        if (measures.length === 0) {
          measures.push({
            orderItemId: rawMeasure.order_customer_measure_id,
            measure: {
              id: rawMeasure.customer_measure_id,
              name: rawMeasure.customer_measure_name,
            },
            value: rawMeasure.customer_measure_value,
          });

          return;
        }

        const lastMeasureId = measures[measures.length - 1]
          .orderItemId as number;

        if (lastMeasureId !== rawMeasure.order_customer_measure_id) {
          measures.push({
            orderItemId: rawMeasure.order_customer_measure_id,
            measure: {
              id: rawMeasure.customer_measure_id,
              name: rawMeasure.customer_measure_name,
            },
            value: rawMeasure.customer_measure_value,
          });
        }
      });
    }

    return {
      id: rawData[0].order_item_id,
      title: rawData[0].order_item_title,
      description: rawData[0].order_item_description,
      cost: rawData[0].order_cost,
      createdAt: new Date(rawData[0].order_created_at),
      dueDate: new Date(rawData[0].order_due_date),
      deliveredAt: rawData[0].order_delivered_at
        ? new Date(rawData[0].order_delivered_at)
        : null,
      measures,
      modelPhotos,
      customer: {
        name: rawData[0].customer_name,
        phone: rawData[0].customer_phone,
      },
    };
  }

  function mapToAdjustOrderEntity(rawdata: AdjustOrderRawData[]): AdjustOrder {
    const orderItems: AdjustOrderItem[] = [];

    rawdata.forEach((rawOrderItem) => {
      if (orderItems.length === 0) {
        orderItems.push({
          id: rawOrderItem.order_item_id,
          title: rawOrderItem.order_item_title,
          description: rawOrderItem.order_item_description,
          adjusts: [
            {
              orderedAdjustId: rawOrderItem.ordered_service_id,
              id: rawOrderItem.adjust_service_id,
              description: rawOrderItem.adjust_service_description,
              cost: rawOrderItem.ordered_service_cost,
              checked: true,
            },
          ],
        });
        return;
      }

      const previousOrderItemId = orderItems[orderItems.length - 1].id;
      const currentOrderItemId = rawOrderItem.order_item_id;

      if (previousOrderItemId === currentOrderItemId) {
        orderItems[orderItems.length - 1].adjusts.push({
          orderedAdjustId: rawOrderItem.ordered_service_id,
          id: rawOrderItem.adjust_service_id,
          description: rawOrderItem.adjust_service_description,
          cost: rawOrderItem.ordered_service_cost,
          checked: true,
        });
      } else {
        orderItems.push({
          id: rawOrderItem.order_item_id,
          title: rawOrderItem.order_item_title,
          description: rawOrderItem.order_item_description,
          adjusts: [
            {
              orderedAdjustId: rawOrderItem.ordered_service_id,
              id: rawOrderItem.adjust_service_id,
              description: rawOrderItem.adjust_service_description,
              cost: rawOrderItem.ordered_service_cost,
              checked: true,
            },
          ],
        });
      }
    });

    const adjustOrder: AdjustOrder = {
      customer: {
        name: rawdata[0].customer_name,
        phone: rawdata[0].customer_phone,
      },
      cost: rawdata[0].order_cost,
      createdAt: new Date(rawdata[0].order_created_at),
      dueDate: new Date(rawdata[0].order_due_date),
      deliveredAt: rawdata[0].order_delivered_at
        ? new Date(rawdata[0].order_delivered_at)
        : null,
      orderItems,
    };

    return adjustOrder;
  }

  return {
    mapToOrderEntityList,
    mapToTailoredClothOrderEntity,
    mapToAdjustOrderEntity,
  };
}
