import { Pressable, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CheckIcon from "../../../../assets/icons/check-icon.svg";

import { Card } from "../../../Customers/Card";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { Customer } from "../../../../entities/Customer";

interface Props {
  customerData: Customer;
  isChecked: boolean;
}

export function RadioButton({ customerData, isChecked }: Props) {
  const { selectCustomer } = useOrderContext();

  return (
    <Pressable onPress={() => selectCustomer(customerData.id)}>
      <Card
        key={customerData.id}
        customer={customerData}
        containerStyle={{ marginBottom: 8 }}
      />

      <View style={[styles.checkButton, isChecked && styles.checkedButton]}>
        {isChecked && (
          <CheckIcon
            width={18}
            height={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        )}
      </View>
    </Pressable>
  );
}
