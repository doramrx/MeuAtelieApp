import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { styles } from "../../styles";

interface Props {
  children: ReactNode;
  containerStyles?: ViewStyle;
}

export function ExpandableItemRoot({ children, containerStyles }: Props) {
  return <View style={[styles.container, containerStyles]}>{children}</View>;
}
