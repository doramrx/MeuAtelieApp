import { Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import PhotoIcon from "../../../assets/icons/photo-icon.svg";

export function PhotoCard(props: { total: number; index: number }) {
    return (
        <TouchableOpacity style={styles.photoCard}>
            <PhotoIcon
                color={THEME.COLORS.GRAY.LIGHT.V1}
                width={35}
                height={35}
            />
            <Text style={styles.photoCardText}>
                {props.index}/{props.total}
            </Text>
        </TouchableOpacity>
    );
}
