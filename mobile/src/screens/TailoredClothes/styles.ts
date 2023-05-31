import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.6;

const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLORS.PINK.V2,
    },

    backContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 22,
    },

    screenTitle: {
        color: THEME.COLORS.WHITE.FULL_WHITE,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 22,
    },

    cancelOrderButton: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(255,255,255,0.28)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    mainContainer: {
        flex: 10,
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: "center",
        overflow: "visible",
    },

    formTitle: {
        alignSelf: "flex-start",
        fontSize: 28 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.GRAY.DARK.V2,
        marginBottom: 20,
        marginLeft: 20,
    },

    newCustomerButton: {
        backgroundColor: THEME.COLORS.PINK.V2,
        alignItems: "center",
        width: sixtyPercentOfScreenWidth,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 10,
    },

    newCustomerText: {
        fontSize: 18 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.WHITE.FULL_WHITE,
    },

    text: {
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 18 * fontScale,
        color: THEME.COLORS.GRAY.DARK.V2,
    },

    input: {
        marginTop: 16,
        marginBottom: 16,
        width: ninetyPercentOfScreenWidth,
    },

    customerList: {
        width: ninetyPercentOfScreenWidth,
    },

    nextStepButton: {
        position: "absolute",
        width: "100%",
        height: 50,
        borderTopWidth: 1,
        borderTopColor: THEME.COLORS.GRAY.LIGHT.V2,
        backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
        alignItems: "center",
        justifyContent: "center",
        bottom: 0,
        left: 0,
        zIndex: 10,
    },

    nextStepText: {
        textAlign: "center",
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 28 * fontScale,
        color: THEME.COLORS.PINK.V1,
    },

    rightArrowIcon: {
        position: "absolute",
        right: 20,
        top: 8,
        alignItems: "center",
    },

    leftArrowIcon: {
        position: "absolute",
        left: 20,
        top: 8,
        alignItems: "center",
        transform: [{ rotate: "180deg" }],
    },

    orderDescription: {
        width: ninetyPercentOfScreenWidth,
        paddingVertical: (32 * 1) / pixelDensity,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 18 * fontScale,
        borderBottomWidth: 2,
        color: THEME.COLORS.GRAY.DARK.V3,
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    },

    optionalFieldsText: {
        fontSize: 20,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
        marginTop: 14,
        alignSelf: "flex-start",
    },

    step2Wrapper: {
        alignItems: "center",
        marginBottom: 40,
    },

    photoContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginTop: 14,
    },

    photoCard: {
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 10,
        borderColor: THEME.COLORS.GRAY.LIGHT.V1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
    },

    photoCardText: {
        color: THEME.COLORS.GRAY.MEDIUM.V2,
    },

    measurementsList: {
        width: ninetyPercentOfScreenWidth,
        marginTop: 14,
        marginBottom: 20,
        paddingHorizontal: 24,
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

    serviceCostWrapper: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
    },

    serviceCostlabel: {
        fontSize: 18,
        marginRight: 10,
    },

    dueDateWrapper: {
        alignSelf: "flex-start",
    },

    dueDateLabel: {
        fontSize: 18,
        marginVertical: 12,
    },

    dueDatePicker: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: ninetyPercentOfScreenWidth,
        paddingVertical: (32 * 1) / pixelDensity,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderBottomWidth: 2,
        color: THEME.COLORS.GRAY.DARK.V3,
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    },

    dueDateValue: {
        fontSize: 18,
    },

    serviceCountForDueDateText: {
        color: THEME.COLORS.RED,
        fontSize: 15,
        alignSelf: "flex-start",
        marginTop: 10,
    },

    button: {
        width: sixtyPercentOfScreenWidth,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    },
    navigateToAgendaButton: {
        borderWidth: 1,
        borderColor: THEME.COLORS.GRAY.LIGHT.V1,
        marginVertical: 10,
    },
    navigateToAgendaText: {
        color: THEME.COLORS.GRAY.MEDIUM.V2,
    },

    finishOrderButton: {
        backgroundColor: THEME.COLORS.PINK.V2
    },
    finishOrderText: {
        color: THEME.COLORS.WHITE.FULL_WHITE
    },
});
