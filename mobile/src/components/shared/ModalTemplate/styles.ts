import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../../theme";

const eightyFivePercentOfScreenWidth = Dimensions.get("screen").width * 0.85;

export const styles = StyleSheet.create({
  modalBackgroundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
  },

  modalContainer: {
    width: eightyFivePercentOfScreenWidth,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  main: {
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 30,
    paddingTop: 22,
    paddingHorizontal: 20,
  },

  title: {
    textAlign: "center",
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 22,
    marginBottom: 22,
  },

  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  closeButton: {
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    borderWidth: 1,
    marginRight: 10,
  },

  closeButtonText: {
    color: THEME.COLORS.GRAY.DARK.V2,
  },
});
