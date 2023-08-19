import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  trashButton: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: THEME.COLORS.WHITE.TRANSPARENT_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },

  name: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  mainContainer: {
    flex: 4.8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  logOutwrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },

  logOutButton: {
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    paddingVertical: 14,
    width: Dimensions.get("screen").width * 0.7,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  logOutButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: THEME.COLORS.GRAY.DARK.V1,
    fontSize: 18,
    marginLeft: 15,
  },
});
