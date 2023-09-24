import { Fragment } from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

import { Order } from "../../../entities/Order";

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  return (
    <View style={[styles.container, order.finished && styles.orderFinished]}>
      <View style={[styles.infoBlock, styles.firstInfoBlock]}>
        <Text style={styles.text}>Cliente:</Text>
        <Text style={styles.text}>{order.customer?.name || ""}</Text>
      </View>
      {order.items.length > 1 ? (
        <Fragment>
          <Text style={styles.text}>Pedidos:</Text>
          {order.items.map((item, index) => {
            return (
              <Text
                key={index}
                style={[styles.text, styles.adjustItem]}
              >
                {`- ${item.title}`}
              </Text>
            );
          })}
        </Fragment>
      ) : (
        <View style={styles.infoBlock}>
          <Text style={styles.text}>Pedido:</Text>
          <Text style={styles.text}>{order.items[0].title}</Text>
        </View>
      )}
      <Text style={[styles.text, styles.dueDateText]}>
        {order.dueDate.toLocaleTimeString("pt-BR")}
      </Text>
    </View>
  );
}
