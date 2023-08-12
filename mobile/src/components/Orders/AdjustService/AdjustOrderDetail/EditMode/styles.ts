import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../../../theme";

const pixelDensity = PixelRatio.get();

const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;
const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.6;

export const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  infoWrapper: {
    paddingHorizontal: 25,
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
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  saveOrderButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
    marginTop: 20,
  },

  saveOrderText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  cancelText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },
});
