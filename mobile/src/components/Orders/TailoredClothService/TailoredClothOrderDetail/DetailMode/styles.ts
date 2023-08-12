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
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  pinkButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
  },

  whiteButtonText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  navigateBackButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  grayButtonText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  emptyListText: {
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
});
