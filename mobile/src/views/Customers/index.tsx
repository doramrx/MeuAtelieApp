/* eslint-disable indent */
import { Text, TouchableOpacity, FlatList, View } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";

import { Card } from "../../components/Customers/Card/index";
import { BottomModal } from "../../components/shared/BottomModal";
import { Screen } from "../../components/shared/Screen";
import { Modal } from "../../components/Customers/Modal";

import {
  CustomerViewControllerData,
  useViewController,
} from "./view-controller";
import { DetailModal } from "../../components/Customers/Modal/DetailModal";
import { EditModal } from "../../components/Customers/Modal/EditModal";
import { CreateModal } from "../../components/Customers/Modal/CreateModal";

interface Props {
  controller?: () => CustomerViewControllerData;
}

export function Customers({ controller }: Props) {
  const viewController = controller ? controller() : useViewController();

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
                customer={item}
                onOptionsClick={viewController.onOpenBottomModal}
                containerStyle={{ marginBottom: 6 }}
              />
            ) : (
              <Card
                key={item.id}
                customer={item}
                onOptionsClick={viewController.onOpenBottomModal}
              />
            );
          }}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                Nenhum cliente cadastrado
              </Text>
            </View>
          )}
          onEndReached={viewController.onNextPage}
        />
      </Screen.Content>

      {/* {viewController.isModalOpen && (
        <Modal
          customerId={viewController.customerId}
          callback={viewController.onListUpdate}
        />
      )} */}

      {viewController.isModalOpen &&
        viewController.modalType === "CustomerDetail" && (
          <DetailModal customerId={viewController.customerId} />
        )}

      {viewController.isModalOpen &&
        viewController.modalType === "CustomerEdit" && (
          <EditModal
            callback={viewController.onListUpdate}
            customerId={viewController.customerId}
          />
        )}

      {viewController.isModalOpen &&
        viewController.modalType === "CustomerCreate" && (
          <CreateModal callback={viewController.onListUpdate} />
        )}

      {viewController.isBottomModalOpen &&
        viewController.modalType === "CustomerActions" && (
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
