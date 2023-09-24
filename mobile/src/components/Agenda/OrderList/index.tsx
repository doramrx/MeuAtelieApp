import { FlatList, Text, View } from "react-native";

import { styles } from "./styles";

import { Order } from "../../../entities/Order";
import { OrderCard } from "../OrderCard";

interface Props {
  data: Order[];
  selectedDay: number | null;
}

export function OrderList({ data, selectedDay }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={
          selectedDay !== null
            ? data.filter((order) => order.dueDate.getDate() === selectedDay)
            : data
        }
        renderItem={({ item }) => {
          return <OrderCard order={item} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ marginBottom: 6 }} />;
        }}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

function EmptyList() {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        Não há nenhum pedido para ser entregue neste mês!
      </Text>
    </View>
  );
}
