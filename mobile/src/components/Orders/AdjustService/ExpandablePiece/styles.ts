import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

const screenWidth = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },

  expandButton: {
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
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

  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: "hidden",
  },

  hiddenContent: {
    height: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  titleInput: {
    marginBottom: 10,
  },

  descriptionTextArea: {
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

  adjustListText: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 14,
  },
});
