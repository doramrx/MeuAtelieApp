import { Text, TouchableOpacity } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import AddIcon from "../../../assets/icons/add-icon.svg";

import { Screen } from "../../../components/shared/Screen";
import { Card } from "../../../components/Orders/Card";
import { Options } from "../../../components/Orders/Options";
import { ServiceTypeModal } from "../../../components/Orders/ServiceTypeModal";
import {
  OrderListViewControllerData,
  useOrderListViewController,
} from "../../../view-controllers/useOrderListViewController";
import { OrderType } from "../../../entities/Order";

export interface OrderData {
  orderId: number;
  orderType: OrderType;
  orderItems: Array<{
    title: string;
    dueDate: Date;
  }>;
}

interface Props {
  controller?: () => OrderListViewControllerData;
}

export function Orders({ controller }: Props) {
  const viewController = controller
    ? controller()
    : useOrderListViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Pedidos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={viewController.onOpenServiceSelectionModal}
        >
          <AddIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <Options />

        <Text style={styles.listCounter}>
          {viewController.orders.length} Pedidos listados
        </Text>

        {viewController.orders.map((order, index) => {
          return viewController.orders.length - 1 !== index ? (
            <Card
              key={order.id}
              orderData={order}
              marginBottom={6}
            />
          ) : (
            <Card
              key={order.id}
              orderData={order}
            />
          );
        })}
      </Screen.Content>

      {viewController.isModalOpen && <ServiceTypeModal />}
    </Screen.Root>
  );
}
