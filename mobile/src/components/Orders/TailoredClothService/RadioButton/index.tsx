import { Pressable, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CheckIcon from "../../../../assets/icons/check-icon.svg";

import { Card, CustomerProps } from "../../../Customers/Card";
import { useOrderContext } from "../../../../hooks/useOrderContext";

interface Props {
  customerDatum: CustomerProps;
  isChecked: boolean;
}

export function RadioButton({ customerDatum, isChecked }: Props) {
  const { selectCustomer } = useOrderContext();

  return (
    <Pressable onPress={() => selectCustomer(customerDatum.customerId)}>
      <Card
        key={customerDatum.customerId}
        customerId={customerDatum.customerId}
        customerName={customerDatum.customerName}
        customerPhone={customerDatum.customerPhone}
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
