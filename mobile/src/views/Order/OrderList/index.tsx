import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import AddIcon from "../../../assets/icons/add-icon.svg";

import { Screen } from "../../../components/shared/Screen";
import { Card } from "../../../components/Orders/Card";
import { Options } from "../../../components/Orders/Options";
import { ServiceTypeModal } from "../../../components/Orders/ServiceTypeModal";

import { OrderType } from "../../../entities/Order";
import {
  OrderListViewControllerData,
  useViewController,
} from "./view-controller";

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
  const viewController = controller ? controller() : useViewController();

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

        <FlatList
          data={viewController.orders}
          renderItem={({ item }) => {
            return <Card orderData={item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => {
            return <View style={{ marginBottom: 6 }} />;
          }}
          ListHeaderComponent={() => {
            return (
              <Text style={styles.listCounter}>
                {viewController.orders.length} Pedidos listados
              </Text>
            );
          }}
        />
      </Screen.Content>

      {viewController.isModalOpen && <ServiceTypeModal />}
    </Screen.Root>
  );
}
