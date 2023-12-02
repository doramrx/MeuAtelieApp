import { View, ViewStyle } from "react-native";

import { styles } from "./styles";
import { MeasureItem } from "../MeasureItem";
import { CustomerMeasureView } from "../../../entities/Order";

interface Props {
  data: CustomerMeasureView[];
  onUpdateMeasure?: (measureId: number, value: string) => void;
  containerStyles?: ViewStyle;
  editable?: boolean;
}

export function MeasureList({
  data,
  containerStyles,
  editable,
  onUpdateMeasure,
}: Props) {
  return (
    <View style={[styles.measureList, containerStyles]}>
      {data.map(({ measure, value }) => {
        return (
          <MeasureItem
            key={measure.id}
            measure={measure}
            value={value}
            measurementUnit="cm"
            onUpdateMeasure={onUpdateMeasure}
            editable={editable}
          />
        );
      })}
    </View>
  );
}
