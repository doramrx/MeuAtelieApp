import {
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from "react-native";

import { styles } from "../styles";

interface Props extends TouchableHighlightProps {
  text: string;
  additionalButtonStyles?: StyleProp<ViewStyle>;
  additionalTextStyles?: StyleProp<TextStyle>;
}

export function ModalAction({
  text,
  additionalButtonStyles,
  additionalTextStyles,
  ...rest
}: Props) {
  return (
    <TouchableHighlight
      style={[styles.button, additionalButtonStyles]}
      {...rest}
    >
      <Text style={[styles.buttonText, additionalTextStyles]}>{text}</Text>
    </TouchableHighlight>
  );
}
