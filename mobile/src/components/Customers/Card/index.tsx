import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";

import UserIconFilled from "../../../assets/icons/user-icon-filled.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

export interface CustomerProps {
  customerId: number;
  customerName: string;
  customerPhone: string;
}

interface Props {
  customerId: number;
  customerName: string;
  customerPhone: string;
  containerStyle?: ViewStyle;
  onOptionsClick?: (id: number) => void;
}

export function Card({
  customerId,
  customerName,
  customerPhone,
  containerStyle,
  onOptionsClick,
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.wrapper}>
        <UserIconFilled color={THEME.COLORS.PINK.V1} />
        <View>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerPhone}>{customerPhone}</Text>
        </View>
      </View>
      {onOptionsClick && (
        <TouchableWithoutFeedback
          onPress={() => {
            onOptionsClick && onOptionsClick(customerId);
          }}
        >
          <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
