import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

const screenWidth = Dimensions.get("screen").width;
const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;
const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.6;

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
    width: screenWidth,
  },

  title: {
    fontSize: 28 * fontScale,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginBottom: 20,
  },

  subTitle: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 20 * fontScale,
    color: THEME.COLORS.GRAY.DARK.V2,
  },

  text: {
    fontSize: 18 * fontScale,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
  },

  padBetweenComponents: {
    marginTop: 14,
  },

  costContainer: {
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
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

  serviceCountText: {
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
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  agendaButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  agentaText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  finishButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
  },

  finishText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },
});
