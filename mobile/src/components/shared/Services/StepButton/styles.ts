import { PixelRatio, StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

const fontScale = PixelRatio.getFontScale();

export const styles = StyleSheet.create({
  button: {
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

  text: {
    textAlign: "center",
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 28 * fontScale,
    color: THEME.COLORS.PINK.V1,
  },

  rightIcon: {
    position: "absolute",
    right: 20,
    top: 8,
    alignItems: "center",
  },

  leftIcon: {
    position: "absolute",
    left: 20,
    top: 8,
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
  },
});
