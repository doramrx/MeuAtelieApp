import { View, ViewStyle } from "react-native";

import { styles } from "./styles";
import { MeasureItem } from "../MeasureItem";

export interface CustomerMeasure {
  id: number;
  name: string;
  value: string;
}

interface Props {
  data: CustomerMeasure[];
  updateMeasureItemFn?: (index: number, newValue: string) => void;
  containerStyles?: ViewStyle;
  editable?: boolean;
}

export function MeasureList({
  data,
  containerStyles,
  editable,
  updateMeasureItemFn,
}: Props) {
  return (
    <View style={[styles.measureList, containerStyles]}>
      {data.map(({ id, name, value }, index) => {
        return (
          <MeasureItem
            key={id}
            index={index}
            name={name}
            value={value}
            measurementUnit="cm"
            onChangeMeasure={updateMeasureItemFn}
            editable={editable}
          />
        );
      })}
    </View>
  );
}
