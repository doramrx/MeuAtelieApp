import { Text, View } from "react-native";

import { styles } from "./styles";
import { AdjustItem } from "../AdjustItem";

export interface AdjustItemData {
  id: number;
  description: string;
  cost: number;
  isChecked?: boolean;
}

interface Props {
  items: AdjustItemData[];
  onSelectItem?: (index: number) => void;
  isEditable?: boolean;
}

export function AdjustList({ items, onSelectItem, isEditable = true }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, !isEditable && styles.withoutPadding]}>
        <Text style={styles.text}>Ajustes</Text>
        <Text style={styles.text}>Valor</Text>
      </View>

      <View>
        {items.map(({ id, description, cost, isChecked }, index) => {
          return (
            <AdjustItem
              key={id}
              description={description}
              cost={cost}
              isChecked={isChecked}
              hasCheckbox={isEditable}
              onSelect={() => onSelectItem && onSelectItem(index)}
            />
          );
        })}
      </View>

      <View style={[styles.footer, !isEditable && styles.withoutPadding]}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>
          R${" "}
          {items
            .reduce((subtotal, adjust) => {
              return adjust.isChecked ? subtotal + adjust.cost : subtotal;
            }, 0)
            .toFixed(2)
            .replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}
