import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CheckIcon from "../../../../assets/icons/check-icon.svg";
import { AdjustCheckBox } from "../../../../entities/Order";

interface Props {
  adjust: AdjustCheckBox;
  onSelect?: () => void;
}

export function AdjustItem({ adjust, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{adjust.description}</Text>

      <View style={styles.wrapper}>
        <Text style={styles.text}>
          R$ {adjust.cost.toFixed(2).padEnd(4, "0").replace(".", ",")}
        </Text>

        {adjust.checked !== null && (
          <Pressable
            onPress={onSelect}
            style={[
              styles.checkBoxButton,
              adjust.checked && styles.checkedBoxButton,
            ]}
          >
            {adjust.checked && (
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
