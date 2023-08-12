import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  Text,
  View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import DetailIcon from "../../../assets/icons/detail-icon-with-border.svg";
import EditIcon from "../../../assets/icons/edit-icon-with-border.svg";
import DeleteIcon from "../../../assets/icons/trash-icon-with-border.svg";

interface Props {
  onCloseModal: () => void;
  onDetailOption: () => void;
  onEditOption?: () => void;
  onDeleteOption?: () => void;
}

export function BottomModal({
  onCloseModal,
  onDetailOption,
  onDeleteOption,
  onEditOption,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <TouchableHighlight
              style={[styles.button, styles.firstButton]}
              onPress={onDetailOption}
              underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            >
              <View style={styles.buttonContentWrapper}>
                <DetailIcon
                  width={34}
                  height={34}
                  color={THEME.COLORS.GRAY.DARK.V3}
                />
                <Text style={styles.buttonText}>Detalhes</Text>
              </View>
            </TouchableHighlight>

            {onEditOption && (
              <TouchableHighlight
                style={styles.button}
                onPress={onEditOption}
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
              >
                <View style={styles.buttonContentWrapper}>
                  <EditIcon
                    width={34}
                    height={34}
                    color={THEME.COLORS.GRAY.DARK.V3}
                  />
                  <Text style={styles.buttonText}>Editar</Text>
                </View>
              </TouchableHighlight>
            )}

            {onDeleteOption && (
              <TouchableHighlight
                style={[styles.button, styles.lastButton]}
                onPress={onDeleteOption}
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
              >
                <View style={styles.buttonContentWrapper}>
                  <DeleteIcon
                    width={34}
                    height={34}
                    color={THEME.COLORS.GRAY.DARK.V3}
                  />
                  <Text style={styles.buttonText}>Deletar</Text>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
