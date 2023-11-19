import { Pressable, Text, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import MeasuringTapeIcon from "../../../assets/icons/measuring-tape-icon.svg";
import NeedleAndThreadIcon from "../../../assets/icons/needle-and-thread-icon.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

import { Order } from "../../../entities/Order";

interface Props {
  orderData: Order;
  containerStyles?: ViewStyle;
}

export function Card({ orderData, containerStyles }: Props) {
  const navigation = useNavigation();

  function navigateToDetailScreen() {
    navigation.navigate("orderDetail", {
      orderId: orderData.id,
      orderType: orderData.type,
    });
  }

  return (
    <Pressable
      style={[styles.container, containerStyles]}
      onPress={navigateToDetailScreen}
    >
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>
          {orderData.type === "adjustService" ? (
            <NeedleAndThreadIcon color={THEME.COLORS.WHITE.FULL_WHITE} />
          ) : (
            <MeasuringTapeIcon color={THEME.COLORS.WHITE.FULL_WHITE} />
          )}
        </View>

        {orderData.type === "tailoredClothService" ? (
          <View>
            <Text style={styles.orderTitle}>
              {orderData.items.length > 0 ? orderData.items[0].title : ""}
            </Text>

            <Text style={styles.orderText}>Tipo Serviço: Roupa sob medida</Text>

            <Text style={styles.orderDueDate}>
              {orderData.dueDate.toLocaleString("pt-BR")}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.orderTitle}>Ajuste de roupa</Text>

            <Text style={styles.orderText}>
              Quantidade de peças: {orderData.items.length}
            </Text>

            <Text style={styles.orderDueDate}>
              {orderData.dueDate.toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      </View>

      <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
    </Pressable>
  );
}
