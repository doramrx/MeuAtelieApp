import { PixelRatio, StyleSheet } from "react-native";
import { THEME } from "../../../theme";

const pixelDensity = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

export const styles = StyleSheet.create({
    input: {
        paddingVertical: 32 * 1 / pixelDensity,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 18 * fontScale,
        borderBottomWidth: 2,
        color: THEME.COLORS.GRAY.DARK.V3,
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    },
    leftIcon: {
        position: "absolute",
        left: 18,
        top: 14,
        zIndex: 1,
    },
    passwordButtonWrapper: {
        position: "absolute",
        right: 18,
        top: 13,
    },
});
