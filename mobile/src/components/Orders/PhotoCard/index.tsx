import { TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import PhotoIcon from "../../../assets/icons/photo-icon.svg";

interface Props {
  onPress: () => void;
}

export function PhotoCard({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.photoCard}
      onPress={onPress}
    >
      <PhotoIcon
        style={styles.photoIcon}
        color={THEME.COLORS.GRAY.LIGHT.V1}
        width={60}
      />
    </TouchableOpacity>
  );
}
