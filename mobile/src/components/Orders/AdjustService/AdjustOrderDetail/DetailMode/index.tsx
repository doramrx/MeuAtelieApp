import { Fragment } from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { AdjustOrderDetailData } from "../../../../../view-controllers/Order/useAdjustOrderDetailViewController";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";

import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { ExpandableAdjustItemList } from "../../ExpandableAdjustItemList";

interface Props {
  controller: AdjustOrderDetailData;
}

export function DetailMode({ controller }: Props) {
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
        mode="View"
        items={controller.adjustOrder.orderItems}
      />

      <View style={[styles.infoWrapper, { marginVertical: 20 }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Contratado em:</Text>
          <Text style={styles.infoText}>
            {controller.adjustOrder.createdAt.toLocaleDateString("pt-BR")}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Data de entrega:</Text>
          <Text style={styles.infoText}>
            {controller.adjustOrder.dueDate.toLocaleDateString("pt-BR")}
          </Text>
        </View>
        {controller.adjustOrder.deliveredAt && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Finalizado em:</Text>
            <Text style={styles.infoText}>
              {controller.adjustOrder.deliveredAt.toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Valor:</Text>
          <Text style={styles.infoText}>
            {`R$ ${controller.adjustOrder.cost.toFixed(2).replace(".", ",")}`}
          </Text>
        </View>
      </View>

      {!controller.adjustOrder.deliveredAt && (
        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={controller.onFinishOrder}
          style={[styles.pinkButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.whiteButtonText]}>
            Finalizar pedido
          </Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={controller.onGoBack}
        style={[styles.goBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
