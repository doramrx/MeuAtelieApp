import { FlatList, View, ViewStyle } from "react-native";

import { RadioButton } from "../RadioButton";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { Customer } from "../../../../entities/Customer";

interface Props {
  customerData: Customer[];
  onEndReached: () => void;
  containerStyles?: ViewStyle;
}

export function RadioGroup({
  containerStyles,
  onEndReached,
  customerData,
}: Props) {
  const { selectedCustomerId } = useOrderContext();

  return (
    <View style={containerStyles}>
      <FlatList
        data={customerData}
        style={{ marginBottom: 300 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RadioButton
            customerData={item}
            isChecked={item.id === selectedCustomerId}
          />
        )}
        onEndReached={onEndReached}
      />
    </View>
  );
}
