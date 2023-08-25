import { useNavigation, useRoute } from "@react-navigation/native";

import { OrderType } from "../../entities/Order";
import { useOrderContext } from "../../hooks/useOrderContext";
import { OrderMode } from "../../contexts/OrderContext";

interface RouteParamsData {
  orderId: number;
  orderType: OrderType;
}

export interface OrderDetailViewControllerData {
  mode: OrderMode | null;
  onChangeMode: () => void;
  orderId: number;
  orderType: OrderType;
}

export function useOrderDetailViewController(): OrderDetailViewControllerData {
  const navigation = useNavigation();
  const routeParams = useRoute().params as RouteParamsData;
  const { mode, changeMode } = useOrderContext();

  if (!routeParams) {
    navigation.goBack();
  }

  return {
    mode,
    onChangeMode: changeMode,
    orderId: routeParams.orderId,
    orderType: routeParams.orderType,
  };
}
