import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CheckIcon from "../../../../assets/icons/check-icon.svg";

interface Props {
  description: string;
  cost: number;
  onSelect?: () => void;
  hasCheckbox?: boolean;
  isChecked?: boolean;
}

export function AdjustItem({
  description,
  cost,
  onSelect,
  hasCheckbox = false,
  isChecked = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>

      <View style={styles.wrapper}>
        <Text style={styles.text}>
          R$ {cost.toFixed(2).padEnd(4, "0").replace(".", ",")}
        </Text>

        {hasCheckbox && (
          <Pressable
            onPress={onSelect}
            style={[
              styles.checkBoxButton,
              isChecked && styles.checkedBoxButton,
            ]}
          >
            {isChecked && (
              <CheckIcon
                width={14}
                height={14}
                color={THEME.COLORS.WHITE.FULL_WHITE}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
