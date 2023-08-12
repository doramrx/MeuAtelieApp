import { ReactNode } from "react";
import { View } from "react-native";

import { styles } from "../styles";

interface Props {
  children: ReactNode;
}

export function ModalActions({ children }: Props) {
  return <View style={styles.buttonsContainer}>{children}</View>;
}
