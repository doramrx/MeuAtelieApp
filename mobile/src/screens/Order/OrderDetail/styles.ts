import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../theme";

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
    justifyContent: "space-between",
    paddingHorizontal: 22,
    alignItems: "center",
  },
  title: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    fontSize: 22,
  },
  addButton: {
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
    paddingBottom: 18,
    overflow: "hidden",
  },
  mainContainerWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  infoTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoLabel: {
    flex: 1,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    fontSize: 16,
  },
  infoText: {
    flex: 2,
    fontSize: 14,
  },
  photoContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  button: {
    width: sixtyPercentOfScreenWidth,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
  },
  goBackButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
    alignSelf: "center",
  },

  goBackText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  changeStatusButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
    alignSelf: "center",
  },

  changeStatusText: {
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

  cancelButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  cancelText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  saveOrderButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
    marginTop: 20,
  },

  saveOrderText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  updateMeasurementsButton: {
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    marginBottom: 20,
    paddingVertical: 16,
  },

  updateMeasurementsContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  updateMeasurementsText: {
    color: THEME.COLORS.GRAY.MEDIUM.V1,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    marginLeft: 10,
    fontSize: 18,
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
});
