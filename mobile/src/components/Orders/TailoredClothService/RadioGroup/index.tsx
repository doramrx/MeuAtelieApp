import { FlatList, View, ViewStyle } from "react-native";

import { CustomerProps } from "../../../Customers/Card";
import { RadioButton } from "../RadioButton";
import { useOrderContext } from "../../../../hooks/useOrderContext";

interface Props {
  customerData: CustomerProps[];
  containerStyles?: ViewStyle;
}

export function RadioGroup({ containerStyles, customerData }: Props) {
  const { selectedCustomerId } = useOrderContext();

  return (
    <View style={containerStyles}>
      <FlatList
        data={customerData}
        style={{ marginBottom: 300 }}
        keyExtractor={(item) => String(item.customerId)}
        renderItem={({ item }) => (
          <RadioButton
            customerDatum={item}
            isChecked={item.customerId === selectedCustomerId}
          />
        )}
      />
    </View>
  );
}
