export type OrderType = "tailoredClothService" | "adjustService";

export interface Order {
  id: number;
  title: string;
  dueDate: Date;
  type: OrderType;
}