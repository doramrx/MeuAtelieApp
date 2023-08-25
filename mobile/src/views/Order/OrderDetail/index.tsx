import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import PenIcon from "../../../assets/icons/pen-icon.svg";
import XIcon from "../../../assets/icons/x-icon.svg";

import { Screen } from "../../../components/shared/Screen";
import { useOrderContext } from "../../../hooks/useOrderContext";
import { TailoredClothOrderDetail } from "../../../components/Orders/TailoredClothService/TailoredClothOrderDetail";
import { AdjustOrderDetail } from "../../../components/Orders/AdjustService/AdjustOrderDetail";
import { OrderType } from "../../../entities/Order";

interface RouteParamsData {
  orderId: number;
  orderType: OrderType;
}

export function OrderDetail() {
  const navigation = useNavigation();
  const routeParams = useRoute().params as RouteParamsData;
  const { mode, changeMode } = useOrderContext();

  if (!routeParams) {
    navigation.goBack();
  }

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>
          {mode === "detail" ? "Detalhes" : "Editar pedido"}
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={changeMode}
        >
          {mode === "detail" ? (
            <PenIcon
              width={18}
              color={THEME.COLORS.WHITE.FULL_WHITE}
            />
          ) : (
            <XIcon
              width={18}
              color={THEME.COLORS.WHITE.FULL_WHITE}
            />
          )}
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <ScrollView style={styles.contentWrapper}>
          {routeParams.orderType === "tailoredClothService" ? (
            <TailoredClothOrderDetail orderId={routeParams.orderId} />
          ) : (
            <AdjustOrderDetail orderId={routeParams.orderId} />
          )}
        </ScrollView>
      </Screen.Content>
    </Screen.Root>
  );
}
