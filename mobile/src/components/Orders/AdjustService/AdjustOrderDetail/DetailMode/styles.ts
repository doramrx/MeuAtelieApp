import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "../../../../../theme";

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

  infoContainer: {
    flexDirection: "row",
  },

  infoLabel: {
    flex: 1,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
  },
  infoText: {
    flex: 2,
    fontSize: 14,
  },

  button: {
    width: sixtyPercentOfScreenWidth,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  pinkButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
  },

  goBackButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  grayButtonText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  whiteButtonText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },
});
