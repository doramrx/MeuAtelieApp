import { View } from "react-native";

import { styles } from "../styles";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";

interface Props {
  children: ReactNode;
  additionalStyles?: ViewStyle;
}

export function ScreenHeader({ children, additionalStyles }: Props) {
  return <View style={[styles.header, additionalStyles]}>{children}</View>;
}
