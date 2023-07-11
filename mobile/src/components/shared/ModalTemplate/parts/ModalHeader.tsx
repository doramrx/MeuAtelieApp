import { ElementType } from "react";
import { ColorValue, View } from "react-native";

import { styles } from "../styles";
import { THEME } from "../../../../theme";

interface Props {
  icon: ElementType;
  backgroundColor: ColorValue;
}

export function ModalHeader({ icon: Icon, backgroundColor }: Props) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <Icon
        color={THEME.COLORS.WHITE.FULL_WHITE}
        width={60}
        height={60}
      />
    </View>
  );
}
