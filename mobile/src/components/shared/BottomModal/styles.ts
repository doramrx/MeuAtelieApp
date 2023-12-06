import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: THEME.COLORS.BLUR,
  },
  container: {
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    width: Dimensions.get("screen").width * 0.95,
    borderRadius: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },
  firstButton: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lastButton: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 0,
  },
  buttonContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 22,
    fontSize: 20,
  },
});
