import { Fragment } from "react";
import { Pressable, Text, TouchableHighlight, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";
import CalendarIcon from "../../../../../assets/icons/calendar-icon-filled.svg";

import { ExpandableAdjustItemList } from "../../ExpandableAdjustItemList";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { AdjustListModal } from "../../AdjustListModal";
import { AdjustOrderDetailData } from "../../../../../view-controllers/Order/useAdjustOrderDetailViewController";

interface Props {
  controller: AdjustOrderDetailData;
}

export function EditMode({ controller }: Props) {
  // function mergeAdjustsIntoOrder(newAdjusts: AdjustItemData[]) {
  //   setOrderData((prevOrderData) => {
  //     return {
  //       customer: {
  //         ...prevOrderData.customer,
  //       },
  //       order: {
  //         ...prevOrderData.order,
  //         items: prevOrderData.order.items.map((item, itemIndex) => {
  //           if (itemIndex !== expandedPieceRef.current) {
  //             return item;
  //           }

  //           return {
  //             ...item,
  //             adjusts: newAdjusts.map((_newAdjust) => {
  //               const existentAdjust = item.adjusts.find(
  //                 (_adjust) => _adjust.adjust.id === _newAdjust.id
  //               );

  //               if (existentAdjust) {
  //                 return existentAdjust;
  //               }

  //               return {
  //                 orderServiceId: null,
  //                 cost: _newAdjust.cost,
  //                 adjust: {
  //                   id: _newAdjust.id,
  //                   description: _newAdjust.description,
  //                 },
  //               };
  //             }),
  //           };
  //         }),
  //       },
  //     };
  //   });
  // }

  // function saveModifications() {
  //   database.transaction((transaction) => {
  //     const orderTotalCost = orderData.order.items.reduce(
  //       (accumulator, item) => {
  //         return (
  //           accumulator +
  //           item.adjusts.reduce((subtotal, adjust) => {
  //             return subtotal + adjust.cost;
  //           }, 0)
  //         );
  //       },
  //       0
  //     );

  //     transaction.executeSql(
  //       "UPDATE orders SET cost = ?, due_date = ? WHERE id = ?;",
  //       [orderTotalCost, orderData.order.dueDate.toISOString(), orderId],
  //       (transaction, resultSet) => {
  //         if (resultSet.rowsAffected !== 1) {
  //           return Alert.alert(
  //             "Erro",
  //             "Não foi possível atualizar o pedido de ajuste de roupa!"
  //           );
  //         }

  //         orderData.order.items.forEach((item) => {
  //           transaction.executeSql(
  //             "UPDATE order_items SET title = ?, description = ? WHERE id = ?",
  //             [item.title, item.description || "", item.id],
  //             (transaction, resultSet) => {
  //               if (resultSet.rowsAffected !== 1) {
  //                 return Alert.alert(
  //                   "Erro",
  //                   "Não foi possível atualizar os itens de ajuste!"
  //                 );
  //               }

  //               const registeredAdjustsNotRemoved = item.adjusts.filter(
  //                 (adjust) => adjust.orderServiceId !== null
  //               );

  //               if (registeredAdjustsNotRemoved.length > 0) {
  //                 const deleteAdjustsSQL = registeredAdjustsNotRemoved
  //                   .map((adjust) => {
  //                     return adjust.orderServiceId;
  //                   })
  //                   .join(",");

  //                 transaction.executeSql(
  //                   `DELETE FROM ordered_services WHERE id NOT IN (${deleteAdjustsSQL}) AND id_order_item = ?;`,
  //                   [item.id]
  //                 );
  //               }

  //               const adjustsToCreate = item.adjusts.filter(
  //                 (adjust) => adjust.orderServiceId === null
  //               );

  //               if (adjustsToCreate.length > 0) {
  //                 const adjustsToCreateValuesSQL = adjustsToCreate.map(
  //                   (adjust) => {
  //                     return `(${adjust.adjust.id}, ${item.id}, ${adjust.cost})`;
  //                   }
  //                 );

  //                 transaction.executeSql(
  //                   `INSERT INTO ordered_services(id_adjust_service, id_order_item, cost) VALUES ${adjustsToCreateValuesSQL};`,
  //                   undefined,
  //                   (_, resultSet) => {
  //                     if (resultSet.insertId && resultSet.insertId === 0) {
  //                       return Alert.alert(
  //                         "Erro",
  //                         "Não foi possível cadastrar novos registros de ajuste de roupa!"
  //                       );
  //                     }
  //                   }
  //                 );
  //               }

  //               Alert.alert("Sucesso", "Pedido atualizado com sucesso!");
  //               getOrderData(orderData);
  //               controller.onChangeMode();
  //             }
  //           );
  //         });
  //       }
  //     );
  //   });
  // }

  return (
    <Fragment>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>Dados do cliente</Text>

        <ClientInfo
          name={controller.adjustOrder.customer.name}
          phone={controller.adjustOrder.customer.phone}
        />

        <Text style={styles.title}>Detalhes do pedido</Text>
      </View>

      <ExpandableAdjustItemList
        mode="Update"
        items={controller.adjustOrderItems}
        setTitle={controller.onUpdateItemTitle}
        setDescription={controller.onUpdateItemDescription}
        setAdjusts={controller.onUpdateItemAdjust}
        getExpandedPiece={controller.onUpdateSelectedItem}
      />

      <View style={styles.infoWrapper}>
        <View style={styles.dueDateWrapper}>
          <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>

          <Pressable
            style={styles.dueDatePicker}
            onPress={controller.onOpenDatePicker}
          >
            <Text style={styles.dueDateValue}>
              {controller.adjustOrder.dueDate.toLocaleDateString("pt-BR")}
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
        onPress={controller.onSaveModifications}
        style={[styles.saveOrderButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.saveOrderText]}>
          Salvar alterações
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={controller.onChangeMode}
        style={[styles.cancelButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
      </TouchableHighlight>

      {controller.isModalOpen && (
        <AdjustListModal
          orderAdjusts={controller.onGetAdjusts()}
          onGetAdjusts={controller.onUpdateOrderItemAdjusts}
        />
      )}
    </Fragment>
  );
}
