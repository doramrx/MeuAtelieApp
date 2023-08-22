import { Order } from "../entities/Order";
import { OrderRawData } from "../models/useOrderModel";

interface AdapterFunctions {
  mapToEntity: (rawData: OrderRawData) => Order;
  mapToEntityList: (rawData: OrderRawData[]) => Order[];
}

export function useOrderAdapter(): AdapterFunctions {
  function mapToEntity(rawData: OrderRawData): Order {
    return {
      id: rawData.id,
      title: rawData.title,
      dueDate: new Date(rawData.due_date),
      type: rawData.type === "Adjust" ? "adjustService" : "tailoredClothService"
    }
  }

  function mapToEntityList(rawData: OrderRawData[]): Order[] {
    return rawData.map(mapToEntity);
  }

  return {
    mapToEntity,
    mapToEntityList
  }
}