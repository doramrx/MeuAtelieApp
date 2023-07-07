import { StyleSheet, PixelRatio } from "react-native";
import { THEME } from "../../theme";

const pixelDensity = PixelRatio.get();

export const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logoImage: {
        width: (400 * 1) / pixelDensity,
        height: (400 * 1) / pixelDensity,
    },

    welcomeContainer: {
        flex: 1.5,
        paddingTop: 40,
        paddingHorizontal: 40,
    },

    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 50,
    },
    message: {
        fontSize: 22,
        fontWeight: "300",
        marginBottom: 80,
    },

    firstButton: {
        marginBottom: 18,
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
        textAlign: "center",
        fontSize: 20,
    },
});
