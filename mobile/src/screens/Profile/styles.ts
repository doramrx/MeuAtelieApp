import { Dimensions, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        backgroundColor: THEME.COLORS.PINK.V2,
    },

    topContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
    },

    name: {
        color: THEME.COLORS.WHITE.FULL_WHITE,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    },

    main: {
        flex: 4.8,
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    },

    logOutwrapper: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
    },

    logOutButton: {
        backgroundColor: THEME.COLORS.GRAY.LIGH.V2,
        paddingVertical: 14,
        width: Dimensions.get("screen").width * 0.7,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLORS.GRAY.LIGH.V1,
    },

    logOutButtonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    buttonText: {
        color: THEME.COLORS.GRAY.DARK.V1,
        fontSize: 18,
        marginLeft: 12
    }
});
