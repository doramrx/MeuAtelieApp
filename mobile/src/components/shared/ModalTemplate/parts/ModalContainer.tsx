import { ReactNode } from "react";
import { Text, View } from "react-native";

import { styles } from "../styles";

interface Props {
  title: string;
  children: ReactNode;
}

export function ModalContainer({ children, title }: Props) {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
}
