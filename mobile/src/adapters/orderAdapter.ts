import { Order } from "../entities/Order";
import { OrderRawData } from "../models/useOrderModel";

interface AdapterFunctions {
  mapToOrderEntityList: (rawData: OrderRawData[]) => Order[];
}

export function useOrderAdapter(): AdapterFunctions {
  function mapToOrderEntity({
    id,
    title,
    due_date,
    type,
  }: OrderRawData): Order {
    return {
      id,
      dueDate: new Date(due_date),
      items: [{ title }],
      type: type === "Tailored" ? "tailoredClothService" : "adjustService",
    };
  }

  function mapToOrderEntityList(rawData: OrderRawData[]): Order[] {
    console.log("Inside useOrderAdapter");
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

  return {
    mapToOrderEntityList,
  };
}
