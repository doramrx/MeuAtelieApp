import { StyleSheet } from "react-native";
import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
    input: {
        paddingVertical: 14,
        paddingLeft: 56,
        paddingRight: 16,
        borderRadius: 12,
        fontSize: 18,
        borderBottomWidth: 2,
        color: THEME.COLORS.GRAY.DARK.V3,
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    },
    leftIcon: {
        position: "absolute",
        left: 18,
        top: 16,
        zIndex: 1,
    },
    passwordButtonWrapper: {
        position: "absolute",
        right: 18,
        top: 14,
    },
});
