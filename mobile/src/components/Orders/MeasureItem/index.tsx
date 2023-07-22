import { Text, TextInput, View } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";

interface Props {
  index: number;
  name: string;
  value: string | null;
  measurementUnit: string;
  onChangeMeasure?: (index: number, newValue: string) => void;
  editable?: boolean;
}

export function MeasureItem({
  index,
  measurementUnit,
  name,
  value,
  editable,
  onChangeMeasure,
}: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.nameText}>{name}:</Text>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="0,00"
          placeholderTextColor={THEME.COLORS.GRAY.MEDIUM.V1}
          keyboardType="numeric"
          maxLength={5}
          style={styles.valueText}
          value={value ? value : ""}
          editable={editable}
          onChangeText={(text) => {
            const typedText = text.charAt(text.length - 1);
            const commaCountInText = (text.match(/,/g) || []).length;
            const dotCountInText = (text.match(/\./g) || []).length;

            if (commaCountInText >= 1 && dotCountInText >= 1) {
              return;
            }

            if (
              (typedText === "." && dotCountInText > 1) ||
              (typedText === "," && commaCountInText > 1)
            ) {
              return;
            }

            if (
              text.length === 1 &&
              commaCountInText === 1 &&
              typedText === ","
            ) {
              return onChangeMeasure && onChangeMeasure(index, "0,");
            }

            if (
              text.length === 1 &&
              dotCountInText === 1 &&
              typedText === "."
            ) {
              return onChangeMeasure && onChangeMeasure(index, "0.");
            }

            if (commaCountInText <= 1 || dotCountInText <= 1) {
              return onChangeMeasure && onChangeMeasure(index, text);
            }
          }}
        />
        <Text style={styles.unitText}>{measurementUnit}</Text>
      </View>
    </View>
  );
}
