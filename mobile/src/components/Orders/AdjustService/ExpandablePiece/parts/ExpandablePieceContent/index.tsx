import { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "../../styles";

interface Props {
  children: ReactNode;
  isExpanded: boolean;
}

export function ExpandablePieceContent({ children, isExpanded }: Props) {
  return (
    <View style={[styles.contentWrapper, !isExpanded && styles.hiddenContent]}>
      {children}
    </View>
  );
}
