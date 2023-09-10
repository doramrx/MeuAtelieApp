import { Text, View } from "react-native";

import { styles } from "./styles";
import { AdjustItem } from "../AdjustItem";
import { AdjustCheckBox } from "../../../../entities/Order";

interface Props {
  adjusts: AdjustCheckBox[];
  onSelectItem?: (index: number) => void;
  isEditable?: boolean;
}

export function AdjustList({
  adjusts,
  onSelectItem,
  isEditable = true,
}: Props) {
  function onGetTotal() {
    const total = adjusts.reduce(
      (subtotal, adjust) =>
        adjust.checked ? subtotal + adjust.cost : subtotal,
      0
    );
    return total.toFixed(2).replace(".", ",");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, !isEditable && styles.withoutPadding]}>
        <Text style={styles.text}>Ajustes</Text>
        <Text style={styles.text}>Valor</Text>
      </View>

      <View>
        {adjusts.map((adjust, index) => {
          return (
            <AdjustItem
              key={adjust.id}
              adjust={adjust}
              onSelect={() => onSelectItem && onSelectItem(index)}
            />
          );
        })}
      </View>

      <View style={[styles.footer, !isEditable && styles.withoutPadding]}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>R$ {onGetTotal()}</Text>
      </View>
    </View>
  );
}
