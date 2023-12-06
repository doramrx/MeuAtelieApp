import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../../../theme";

const screenWidth = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: THEME.COLORS.BLUR,
  },

  container: {
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    width: screenWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 86,
    height: 86,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  buttonPadding: {
    marginRight: 10,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: THEME.COLORS.GRAY.DARK.V3,
    fontSize: 16
  },

  photoIcon: {
    marginLeft: 4,
    marginTop: 5
  },
});
