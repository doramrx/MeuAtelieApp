interface Customer {
  name: string;
  phone: string;
}

export interface Measure {
  id: number;
  name: string;
}

export interface CustomerMeasure {
  orderItemId?: number;
  measure: Measure;
  value: number;
}

export interface TailoredClothOrder {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate: Date;
  deliveredAt: Date | null;
  cost: number;
  measures: CustomerMeasure[];
  customer: Customer;
}

export interface AdjustOrder {
  customer: Customer;
  cost: number;
  dueDate: Date;
  createdAt: Date;
  deliveredAt: Date | null;
  orderItems: AdjustOrderItem[];
}

export interface AdjustOrderItem {
  id: number | null;
  title: string;
  description?: string;
  adjusts: AdjustCheckBox[];
}

export interface Adjust {
  id: number;
  description: string;
  cost: number;
}

export interface AdjustCheckBox {
  id: number;
  description: string;
  cost: number;
  checked: boolean | null;
}

interface CustomerAdjust {
  orderItemId: number;
  practicedPrice: number;
  adjust: {
    id: number;
    description: string;
  };
}

export type OrderType = "tailoredClothService" | "adjustService";

export interface Order {
  id: number;
  dueDate: Date;
  type: OrderType;
  items: Array<{
    title: string;
  }>;
}

// ------------------------------------------------

// OrderList
// interface OrderData {
//   orderId: number;
//   orderType: OrderType;
//   orderItems: Array<{
//     title: string;
//     dueDate: Date;
//   }>;
// }

// // ------------------------------------------------

// // OrderDetail
// // TailoredCloth
// // Detail
// interface OrderData {
//   customer: {
//     name: string;
//     phone: string;
//   };
//   orderItem: {
//     id: number;
//     title: string;
//     description: string;
//     hiredAt: Date;
//     dueDate: Date;
//     deliveredAt: Date | null;
//     cost: number;
//     measures: CustomerMeasureData[];
//   };
// }
// interface CustomerMeasureData {
//   orderMeasureId: number | null;
//   id: number;
//   name: string;
//   value: string;
// }

// // Adjust
// // Detail
// interface AdjustOrderData {
//   customer: {
//     name: string;
//     phone: string;
//   };
//   order: {
//     cost: number;
//     dueDate: Date;
//     hiredAt: Date;
//     deliveredAt: Date | null;
//     items: AdjustOrderItemData[];
//   };
// }
// interface AdjustData {
//   orderServiceId: number | null;
//   cost: number;
//   adjust: {
//     id: number;
//     description: string;
//   };
// }

// interface AdjustOrderItemData {
//   id: number;
//   title: string;
//   description?: string;
//   adjusts: AdjustData[];
// }
