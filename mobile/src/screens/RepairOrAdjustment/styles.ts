import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

const screenWidth = Dimensions.get("screen").width;
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

    step2Wrapper: {
        alignItems: "center",
        marginBottom: 40,
        width: screenWidth,
    },

    formTitle: {
        fontSize: 28 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.GRAY.DARK.V2,
        marginBottom: 20,
    },

    textBold: {
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        fontSize: 20 * fontScale,
        color: THEME.COLORS.GRAY.DARK.V2,
    },

    fieldText: {
        fontSize: 18 * fontScale,
        fontWeight: THEME.FONT.WEIGHT.REGULAR as any,
        marginTop: 14,
    },

    amountInput: {
        marginTop: 14,
    },

    pieceList: {
        marginTop: 14,
    },

    expandableItemContainer: {
        width: screenWidth,
    },

    expandableItem: {
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    expandableItemText: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.GRAY.MEDIUM.V1,
    },

    triangleIcon: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 15,
        borderRightWidth: 8,
        borderBottomWidth: 0,
        borderLeftWidth: 8,
        borderTopColor: THEME.COLORS.GRAY.MEDIUM.V2,
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
    },

    expandableItemContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        overflow: "hidden",
    },

    itemDescription: {
        paddingVertical: (32 * 1) / pixelDensity,
        paddingHorizontal: 24,
        borderRadius: 12,
        fontSize: 18 * fontScale,
        borderBottomWidth: 2,
        color: THEME.COLORS.GRAY.DARK.V3,
        backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
        borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
        marginBottom: 14,
    },

    expandableItemListText: {
        alignSelf: "center",
        fontSize: 16,
        marginBottom: 14,
    },

    repairOrAdjustServiceList: {
        paddingHorizontal: 12,
    },

    repairOrAdjustServiceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        paddingRight: 46,
    },

    headerColumnText: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.PINK.V1,
    },

    footerColumnText: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
        color: THEME.COLORS.PINK.V1,
    },

    repairOrAdjustServiceFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 36,
    },

    serviceItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 5,
        marginBottom: 10,
        paddingHorizontal: 3,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLORS.GRAY.MEDIUM.V2,
    },

    serviceItemText: {
        fontSize: 16,
    },

    serviceItemCostWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    serviceItemCheckbox: {
        width: 28,
        height: 28,
        marginLeft: 14,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: THEME.COLORS.GRAY.MEDIUM.V2,
        alignItems: "center",
        justifyContent: "center",
    },

    totalServiceCostContainer: {
        width: screenWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        marginTop: 14,
    },

    totalServiceCostText: {
        fontSize: 18,
        fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    },

    dueDateWrapper: {
        marginTop: 14,
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
        backgroundColor: THEME.COLORS.PINK.V2,
    },
    
    finishOrderText: {
        color: THEME.COLORS.WHITE.FULL_WHITE,
    },
});
