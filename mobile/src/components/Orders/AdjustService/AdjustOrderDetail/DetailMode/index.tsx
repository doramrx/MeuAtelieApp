import { Fragment } from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";

import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { ExpandableAdjustItemList } from "../../ExpandableAdjustItemList";
import { AdjustOrder } from "../../../../../entities/Order";
import { useViewController } from "./view-controller";

interface Props {
  orderId: number;
  orderData: AdjustOrder;
}

export function DetailMode({ orderId, orderData }: Props) {
  const viewController = useViewController({ orderId, orderData });

  return (
    <Fragment>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>Dados do cliente</Text>

        <ClientInfo
          name={orderData.customer.name}
          phone={orderData.customer.phone}
        />

        <Text style={styles.title}>Detalhes do pedido</Text>
      </View>

      <ExpandableAdjustItemList
        mode="View"
        items={orderData.orderItems}
      />

      <View style={[styles.infoWrapper, { marginVertical: 20 }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Contratado em:</Text>
          <Text style={styles.infoText}>
            {orderData.createdAt.toLocaleString("pt-BR")}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Data de entrega:</Text>
          <Text style={styles.infoText}>
            {orderData.dueDate.toLocaleString("pt-BR")}
          </Text>
        </View>
        {orderData.deliveredAt && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Finalizado em:</Text>
            <Text style={styles.infoText}>
              {orderData.deliveredAt.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Valor:</Text>
          <Text style={styles.infoText}>
            {`R$ ${orderData.cost.toFixed(2).replace(".", ",")}`}
          </Text>
        </View>
      </View>

      {!orderData.deliveredAt && (
        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={viewController.onFinishOrder}
          style={[styles.pinkButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.whiteButtonText]}>
            Finalizar pedido
          </Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={viewController.onGoBack}
        style={[styles.goBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
