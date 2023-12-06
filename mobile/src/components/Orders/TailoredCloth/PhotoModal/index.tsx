import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";

import { useAppContext } from "../../../../hooks/useAppContext";
import { ModelPhotoView } from "../../../../entities/Order";

interface Props {
  onGetModelPhoto: () => ModelPhotoView | null;
  onRemoveModelPhoto?: () => void;
}

export function PhotoModal({ onGetModelPhoto, onRemoveModelPhoto }: Props) {
  const modelPhoto = onGetModelPhoto();
  const { closeModal, modalType } = useAppContext();

  if (!modelPhoto) {
    closeModal();
    return;
  }

  console.log(modelPhoto);
  // console.log("---------------------------------");
  // console.log(`Screen width: ${Dimensions.get("screen").width}`);
  // console.log("---------------------------------");
  // console.log(`Screen height: ${Dimensions.get("screen").height}`);
  // console.log("---------------------------------");
  // console.log(`Screen height (80%): ${Dimensions.get("screen").height * 0.8}`);
  // console.log("---------------------------------");
  // console.log(`Screen height (70%): ${Dimensions.get("screen").height * 0.7}`);
  // console.log("---------------------------------");
  // console.log(
  //   `Proportional height: ${
  //     (modelPhoto.height / modelPhoto.width) * Dimensions.get("screen").width
  //   }`
  // );

  // const proportionalHeight =
  //   (modelPhoto.height / modelPhoto.width) * Dimensions.get("screen").width;

  return modalType === "ModelPhotoView" ? (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <View style={styles.wrapper}>
        <View>
          <View style={styles.photoContainer}>
            <Image
              resizeMode="contain"
              style={{
                width: Dimensions.get("screen").width,
                height: "100%",
              }}
              source={{
                uri: modelPhoto.uri,
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            {onRemoveModelPhoto && (
              <TouchableHighlight
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={onRemoveModelPhoto}
                style={[styles.button, styles.removePhotoButton]}
              >
                <Text style={[styles.buttonText, styles.removePhotoButtonText]}>
                  Remover foto
                </Text>
              </TouchableHighlight>
            )}

            <TouchableHighlight
              underlayColor={THEME.COLORS.GRAY.MEDIUM.V2}
              onPress={closeModal}
              style={[styles.button, styles.closeModalButton]}
            >
              <Text style={[styles.buttonText, styles.closeModalButtonText]}>
                Fechar
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
}
