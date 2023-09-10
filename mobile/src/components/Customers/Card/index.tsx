import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";

import UserIconFilled from "../../../assets/icons/user-icon-filled.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";
import { Customer } from "../../../entities/Customer";

interface Props {
  customer: Customer;
  containerStyle?: ViewStyle;
  onOptionsClick?: (id: number) => void;
}

export function Card({ customer, containerStyle, onOptionsClick }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.wrapper}>
        <UserIconFilled color={THEME.COLORS.PINK.V1} />
        <View>
          <Text style={styles.customerName}>{customer.name}</Text>
          <Text style={styles.customerPhone}>{customer.phone}</Text>
        </View>
      </View>
      {onOptionsClick && (
        <TouchableWithoutFeedback
          onPress={() => {
            onOptionsClick && onOptionsClick(customer.id);
          }}
        >
          <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
