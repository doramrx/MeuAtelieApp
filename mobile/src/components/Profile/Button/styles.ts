import { StyleSheet } from "react-native";
import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },

  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    color: THEME.COLORS.GRAY.MEDIUM.V1,
    fontSize: 18,
    marginLeft: 28,
  },
});
