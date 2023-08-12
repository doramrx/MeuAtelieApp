import { Text, TouchableHighlight, View } from "react-native";

import { THEME } from "../../../../../../theme";
import { styles } from "../../styles";
import UpdateIcon from "../../../../../../assets/icons/update-icon.svg";
import { useAppContext } from "../../../../../../hooks/useAppContext";

export function ExpandablePieceUpdateButton() {
  const { openModal } = useAppContext();

  function handleOpenModal() {
    openModal("Update");
  }

  return (
    <TouchableHighlight
      onPress={handleOpenModal}
      underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
      style={styles.button}
    >
      <View style={styles.buttonWrapper}>
        <UpdateIcon
          color={THEME.COLORS.GRAY.MEDIUM.V1}
          width={20}
          height={20}
        />
        <Text style={styles.buttonText}>Atualizar ajustes</Text>
      </View>
    </TouchableHighlight>
  );
}
