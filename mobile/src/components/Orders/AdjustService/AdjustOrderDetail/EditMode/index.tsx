import { Fragment } from "react";
import { Pressable, Text, TouchableHighlight, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";
import CalendarIcon from "../../../../../assets/icons/calendar-icon-filled.svg";

import { ExpandableAdjustItemList } from "../../ExpandableAdjustItemList";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { AdjustListModal } from "../../AdjustListModal";
import { AdjustOrderItem } from "../../../../../entities/Order";
import { useViewController } from "./view-controller";
import { Customer } from "../../../../../entities/Order";

interface Props {
  orderId: number;
  customerData: Customer;
  orderItemsData: AdjustOrderItem[];
  orderDueDate: Date;
  onTriggerFetchOrderData: () => Promise<void>;
}

export function EditMode({
  orderId,
  customerData,
  orderItemsData,
  orderDueDate,
  onTriggerFetchOrderData,
}: Props) {
  const viewController = useViewController({
    orderId,
    orderItemsData,
    orderDueDate,
    onTriggerFetchOrderData,
  });

  return (
    <Fragment>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>Dados do cliente</Text>

        <ClientInfo
          name={customerData.name}
          phone={customerData.phone}
        />

        <Text style={styles.title}>Detalhes do pedido</Text>
      </View>

      <ExpandableAdjustItemList
        mode="Update"
        items={viewController.orderItems}
        setTitle={viewController.onUpdateItemTitle}
        setDescription={viewController.onUpdateItemDescription}
        setAdjusts={viewController.onUpdateItemAdjust}
        getExpandedPiece={viewController.onUpdateSelectedItem}
      />

      <View style={styles.infoWrapper}>
        <View style={styles.dueDateWrapper}>
          <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>

          <Pressable
            style={styles.dueDatePicker}
            onPress={viewController.onOpenDateTimePicker}
          >
            <Text style={styles.dueDateValue}>
              {viewController.dueDate.toLocaleString("pt-BR")}
            </Text>

            <CalendarIcon
              width={22}
              height={22}
              color={THEME.COLORS.GRAY.LIGHT.V1}
            />
          </Pressable>
        </View>

        <Text style={styles.serviceCountForDueDateText}>
          * Existem 6 serviços para serem entregues nesta data!
        </Text>
      </View>

      <TouchableHighlight
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={viewController.onSave}
        style={[styles.saveOrderButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.saveOrderText]}>
          Salvar alterações
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={viewController.onChangeMode}
        style={[styles.cancelButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
      </TouchableHighlight>

      {viewController.isModalOpen && (
        <AdjustListModal
          orderAdjusts={viewController.onGetAdjusts()}
          onGetAdjusts={viewController.onUpdateOrderItemAdjusts}
        />
      )}
    </Fragment>
  );
}
