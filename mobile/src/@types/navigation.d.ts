import { ServiceType } from "../screens/Orders";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      inaugural: undefined;
      signIn: undefined;
      signUp: undefined;
      orders: undefined;
      tailoredClothes: undefined;
      repairOrAdjustment: undefined;
      orderDetail: {
        orderId: number;
        orderType: ServiceType;
      };
      tabNavigatorRoutes: undefined;
    }
  }
}
