import { ElementType } from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

interface Props {
  onItemPress: () => void;
  text: string;
  icon: ElementType;
}

export function Button({ text, icon: Icon, onItemPress }: Props) {
  return (
    <TouchableHighlight
      underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
      activeOpacity={0.9}
      style={styles.container}
      onPress={onItemPress}
    >
      <View style={styles.contentWrapper}>
        <Icon
          width={40}
          height={40}
          color={THEME.COLORS.GRAY.MEDIUM.V1}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}
