import { Text, TextInput, View } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import { Measure } from "../../../entities/Order";

interface Props {
  measure: Measure;
  value: string;
  measurementUnit: string;
  onUpdateMeasure?: (measureId: number, value: string) => void;
  editable?: boolean;
}

export function MeasureItem({
  measure,
  measurementUnit,
  value,
  editable,
  onUpdateMeasure,
}: Props) {
  return (
    <View style={styles.item}>
      <Text style={styles.nameText}>{measure.name}:</Text>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="0,00"
          placeholderTextColor={THEME.COLORS.GRAY.MEDIUM.V1}
          keyboardType="numeric"
          maxLength={5}
          style={styles.valueText}
          value={value}
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
              return onUpdateMeasure && onUpdateMeasure(measure.id, "0,");
            }

            if (
              text.length === 1 &&
              dotCountInText === 1 &&
              typedText === "."
            ) {
              return onUpdateMeasure && onUpdateMeasure(measure.id, "0.");
            }

            if (commaCountInText <= 1 || dotCountInText <= 1) {
              return onUpdateMeasure && onUpdateMeasure(measure.id, text);
            }
          }}
        />
        <Text style={styles.unitText}>{measurementUnit}</Text>
      </View>
    </View>
  );
}
