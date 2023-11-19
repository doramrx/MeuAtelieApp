import { Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import PhotoIcon from "../../../assets/icons/photo-icon.svg";

interface Props {
  total: number;
  index: number;
}

export function PhotoCard({ index, total }: Props) {
  return (
    <TouchableOpacity style={styles.photoCard}>
      <PhotoIcon
        color={THEME.COLORS.GRAY.LIGHT.V1}
        width={35}
        height={35}
      />
      <Text style={styles.photoCardText}>
        {index}/{total}
      </Text>
    </TouchableOpacity>
  );
}
