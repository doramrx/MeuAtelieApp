import { Text, View, ViewStyle } from "react-native";

import { styles } from "./styles";

import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import { THEME } from "../../../../theme";

interface Props {
  containerStyles?: ViewStyle;
  name: string;
  phone: string;
}

export function ClientInfo({ name, phone, containerStyles }: Props) {
  return (
    <View style={[styles.container, containerStyles]}>
      <UserIcon
        width={40}
        height={40}
        color={THEME.COLORS.GRAY.MEDIUM.V1}
      />
      <View style={styles.clientInfoContainer}>
        <Text style={styles.clientName}>{name}</Text>
        <Text style={styles.clientPhone}>{phone}</Text>
      </View>
    </View>
  );
}
