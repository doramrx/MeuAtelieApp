import { Text, View, ViewStyle } from "react-native";

interface Props {
  label: string;
  text: string;
  containerStyles?: ViewStyle;
}

export function ExpandablePieceInfo({ label, text, containerStyles }: Props) {
  return (
    <View style={[containerStyles]}>
      <Text>{label}</Text>
      <Text>{text}</Text>
    </View>
  );
}
