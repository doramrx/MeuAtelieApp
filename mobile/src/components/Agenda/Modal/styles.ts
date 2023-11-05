import { StyleSheet } from "react-native";
import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {},

  button: {
    backgroundColor: THEME.COLORS.PINK.V2,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
  },

  text: {
    textAlign: "center",
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },
});
