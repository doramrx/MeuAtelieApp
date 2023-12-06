import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { styles } from "./styles";
import PhotoIcon from "../../../../assets/icons/photo-icon.svg";
import TakePhotoFromCameraIcon from "../../../../assets/icons/take-photo-camera-icon.svg";

import { useAppContext } from "../../../../hooks/useAppContext";
import { THEME } from "../../../../theme";

interface Props {
  onChooseCameraSource: () => void;
  onChooseGallerySource: () => void;
}

export function ChoosePhotoSourceModal({
  onChooseCameraSource,
  onChooseGallerySource,
}: Props) {
  const { closeBottomModal } = useAppContext();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={closeBottomModal}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPadding]}
              onPress={onChooseCameraSource}
            >
              <View style={styles.buttonContainer}>
                <TakePhotoFromCameraIcon
                  style={styles.photoIcon}
                  color={THEME.COLORS.GRAY.LIGHT.V1}
                  width={38}
                  height={38}
                />
                <Text style={styles.buttonText}>Câmera</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={onChooseGallerySource}
            >
              <View style={styles.buttonContainer}>
                <PhotoIcon
                  style={styles.photoIcon}
                  color={THEME.COLORS.GRAY.LIGHT.V1}
                  width={40}
                  height={40}
                />
                <Text style={styles.buttonText}>Galeria</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
