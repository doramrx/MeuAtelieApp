import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.22)",
    },
    container: {
        width: Dimensions.get("screen").width * 0.85,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        height: 90,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    main: {
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 30,
        paddingTop: 22,
        paddingHorizontal: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 22,
        marginBottom: 22
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    button: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 8,
    },
    closeModalButton: {
        borderWidth: 1,
        borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    },
    closeModalText: {
        color: THEME.COLORS.GRAY.MEDIUM.V1,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 16,
        color: THEME.COLORS.WHITE.FULL_WHITE
    },
});
