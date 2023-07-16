import { Dimensions, PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

const fontScale = PixelRatio.getFontScale();
const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.6;
const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;

export const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    fontSize: 28 * fontScale,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginBottom: 20,
    marginLeft: 20,
  },

  button: {
    backgroundColor: THEME.COLORS.PINK.V2,
    alignItems: "center",
    width: sixtyPercentOfScreenWidth,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  textButton: {
    fontSize: 18 * fontScale,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  text: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
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
});
