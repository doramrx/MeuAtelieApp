import { Pressable, Text, View } from "react-native";

import { styles } from "../../styles";

interface Props {
  onExpand: () => void;
  itemName: string;
}

export function ExpandablePieceItem({ itemName, onExpand }: Props) {
  return (
    <Pressable
      style={styles.expandButton}
      onPress={onExpand}
    >
      <Text style={styles.text}>{itemName}</Text>
      <View style={styles.triangleIcon} />
    </Pressable>
  );
}
