import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        flex: 1,
        backgroundColor: THEME.COLORS.PINK.V2,
    },

    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logoImage: {
        width: 150,
        height: 150,
    },

    welcomeContainer: {
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
        flex: 1.5,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
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
        shadowColor: "#000",
    },
    buttonText: {
        color: THEME.COLORS.WHITE.FULL_WHITE,
        textAlign: "center",
        fontSize: 20,
    },
});
