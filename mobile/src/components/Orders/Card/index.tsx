import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import MeasuringTapeIcon from "../../../assets/icons/measuring-tape-icon.svg";
import NeedleAndThreadIcon from "../../../assets/icons/needle-and-thread-icon.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

import { OrderData } from "../../../screens/Order/OrderList";

interface Props extends OrderData {
  marginBottom?: number;
}

export function Card({ orderId, orderItems, orderType, marginBottom }: Props) {
  const navigation = useNavigation();

  function navigateToDetailScreen() {
    console.log(orderId);
    navigation.navigate("orderDetail", {
      orderId: orderId,
      orderType: orderType,
    });
  }

  return (
    <Pressable
      style={[styles.container, { marginBottom: marginBottom }]}
      onPress={navigateToDetailScreen}
    >
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>
          {orderType === "adjustService" ? (
            <NeedleAndThreadIcon color={THEME.COLORS.WHITE.FULL_WHITE} />
          ) : (
            <MeasuringTapeIcon color={THEME.COLORS.WHITE.FULL_WHITE} />
          )}
        </View>

        {orderType === "tailoredClothService" ? (
          <View>
            <Text style={styles.orderTitle}>{orderItems[0].title}</Text>

            <Text style={styles.orderText}>Tipo Serviço: Roupa sob medida</Text>

            <Text style={styles.orderDueDate}>
              {`${String(orderItems[0].dueDate.getDate()).padStart(
                2,
                "0"
              )}/${String(orderItems[0].dueDate.getMonth() + 1).padStart(
                2,
                "0"
              )}/${orderItems[0].dueDate.getFullYear()}`}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.orderTitle}>Ajuste de roupa</Text>

            <Text style={styles.orderText}>
              Quantidade de peças: {orderItems.length}
            </Text>

            <Text style={styles.orderDueDate}>
              {`${String(orderItems[0].dueDate.getDate()).padStart(
                2,
                "0"
              )}/${String(orderItems[0].dueDate.getMonth() + 1).padStart(
                2,
                "0"
              )}/${orderItems[0].dueDate.getFullYear()}`}
            </Text>
          </View>
        )}
      </View>

      <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
    </Pressable>
  );
}
