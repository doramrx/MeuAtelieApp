import { Text, TouchableOpacity, FlatList } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";

import { Card } from "../../components/Customers/Card/index";
import { BottomModal } from "../../components/shared/BottomModal";
import { Screen } from "../../components/shared/Screen";
import { Modal } from "../../components/Customers/Modal";
import {
  CustomerViewControllerData,
  useCustomerViewController,
} from "../../view-controllers/useCustomerViewController";

interface Props {
  controller?: () => CustomerViewControllerData;
}

export function Customers({ controller }: Props) {
  const viewController = controller
    ? controller()
    : useCustomerViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity
          onPress={viewController.onOpenCreateModal}
          style={styles.addButton}
        >
          <AddIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={viewController.customers}
          renderItem={({ item, index }) => {
            return index < viewController.customers.length ? (
              <Card
                key={item.id}
                customerId={item.id}
                customerName={item.name}
                customerPhone={item.phone}
                onOptionsClick={viewController.onOpenBottomModal}
                containerStyle={{ marginBottom: 6 }}
              />
            ) : (
              <Card
                key={item.id}
                customerId={item.id}
                customerName={item.name}
                customerPhone={item.phone}
                onOptionsClick={viewController.onOpenBottomModal}
              />
            );
          }}
          onEndReached={viewController.onNextPage}
        />
      </Screen.Content>

      {viewController.isModalOpen && (
        <Modal
          customerId={viewController.customerId}
          callback={viewController.onListUpdate}
        />
      )}

      {viewController.isBottomModalOpen && (
        <BottomModal
          onDetailOption={viewController.onOpenDetailModal}
          onEditOption={viewController.onOpenEditModal}
          onDeleteOption={viewController.onDeleteCustomer}
          onCloseModal={viewController.onCloseBottomModal}
        />
      )}
    </Screen.Root>
  );
}
