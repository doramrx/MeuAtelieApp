import { ScrollView, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import PenIcon from "../../../assets/icons/pen-icon.svg";
import XIcon from "../../../assets/icons/x-icon.svg";

import { Screen } from "../../../components/shared/Screen";
import { TailoredClothOrderDetail } from "../../../components/Orders/TailoredCloth/OrderDetail";
import { AdjustOrderDetail } from "../../../components/Orders/AdjustService/AdjustOrderDetail";
import {
  OrderDetailViewControllerData,
  useOrderDetailViewController,
} from "../../../view-controllers/Order/useOrderDetailViewController";

interface Props {
  controller?: () => OrderDetailViewControllerData;
}

export function OrderDetail({ controller }: Props) {
  const viewController = controller
    ? controller()
    : useOrderDetailViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>
          {viewController.mode === "detail" ? "Detalhes" : "Editar pedido"}
        </Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={viewController.onChangeMode}
        >
          {viewController.mode === "detail" ? (
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
          {viewController.orderType === "tailoredClothService" ? (
            <TailoredClothOrderDetail orderId={viewController.orderId} />
          ) : (
            <AdjustOrderDetail orderId={viewController.orderId} />
          )}
        </ScrollView>
      </Screen.Content>
    </Screen.Root>
  );
}
