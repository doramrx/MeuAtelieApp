import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../../theme";

const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;

export const styles = StyleSheet.create({
    measurementsList: {
        width: ninetyPercentOfScreenWidth,
        marginBottom: 20,
    },

    measureItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    },

    measureName: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
        color: THEME.COLORS.GRAY.DARK.V3,
        paddingLeft: 6,
    },

    measurementValueWrapper: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },

    measurementValue: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
        color: THEME.COLORS.GRAY.DARK.V3,
        marginRight: 4,
    },

    measurementUnit: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
        color: THEME.COLORS.GRAY.DARK.V3,
    },
});
