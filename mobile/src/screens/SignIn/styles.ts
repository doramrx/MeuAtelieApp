import { PixelRatio } from "react-native";
import { Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { THEME } from "../../theme";

const pixelDensity = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        backgroundColor: THEME.COLORS.PINK.V2,
    },

    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logoImage: {
        width: 330 * 1 / pixelDensity,
        height: 330 * 1 / pixelDensity,
    },

    mainContainer: {
        flex: 2.5,
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 40,
        paddingHorizontal: 40,
    },
    title: {
        fontSize: 35 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        marginBottom: 30,
    },
    forgotPassword: {
        marginTop: 14,
        color: THEME.COLORS.PINK.V2,
        fontSize: 18 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        textDecorationLine: "underline",
        textAlign: "center",
    },
    button: {
        backgroundColor: THEME.COLORS.PINK.V2,
        paddingVertical: 10,
        borderRadius: 12,
        elevation: 4,
        shadowColor: THEME.COLORS.BLACK,
    },
    buttonText: {
        color: THEME.COLORS.WHITE.FULL_WHITE,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        textAlign: "center",
        fontSize: 20 * fontScale,
    },
    wrapper: {
        position: "absolute",
        left: 40,
        bottom: 55,
        width: "100%",
    },
    signUpMessageWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 18 * fontScale,
    },
    message: {
        color: THEME.COLORS.BLACK,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
    },
    link: {
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.PINK.V1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});
