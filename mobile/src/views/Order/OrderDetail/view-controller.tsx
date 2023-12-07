import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { OrderType } from "../../../entities/Order";
import { OrderMode } from "../../../contexts/OrderContext";
import { useOrderContext } from "../../../hooks/useOrderContext";
import { useOrderViewModel } from "../../../view-models/useOrderViewModel";
import { useCallback, useState } from "react";

interface RouteParamsData {
  orderId: number;
  orderType: OrderType;
}

export interface OrderDetailViewControllerData {
  mode: OrderMode | null;
  orderId: number;
  orderType: OrderType;
  orderFinished: boolean;
  onChangeMode: () => void;
}

export function useViewController(): OrderDetailViewControllerData {
  const navigation = useNavigation();
  const routeParams = useRoute().params as RouteParamsData;
  const { mode, changeMode } = useOrderContext();
  const orderViewModel = useOrderViewModel({});

  const [orderFinished, setOrderFinished] = useState(false);

  if (!routeParams) {
    navigation.goBack();
  }

  useFocusEffect(
    useCallback(() => {
      orderViewModel.orderFinished(routeParams.orderId).then((finished) => {
        setOrderFinished(finished);
      });
    }, [routeParams.orderId])
  );

  return {
    mode,
    orderId: routeParams.orderId,
    orderType: routeParams.orderType,
    orderFinished,
    onChangeMode: changeMode,
  };
}
