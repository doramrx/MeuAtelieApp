import { Fragment } from "react";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

import { Order, OrderType } from "../../../entities/Order";
import { useAppContext } from "../../../hooks/useAppContext";

interface Props {
  order: Order;
  onOrderClick: (
    orderId: number,
    orderType: OrderType,
    finished: boolean
  ) => void;
}

export function OrderCard({ order, onOrderClick }: Props) {
  const { openModal } = useAppContext();

  function onOpenModal() {
    onOrderClick(order.id, order.type, order.finished || false);
    openModal("AgendaOrderOptions");
  }

  return (
    <Pressable
      onPress={onOpenModal}
      style={[styles.container, order.finished && styles.orderFinished]}
    >
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
    </Pressable>
  );
}
