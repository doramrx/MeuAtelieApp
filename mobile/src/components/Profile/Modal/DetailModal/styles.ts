import { StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  labelContainer: {
    marginRight: 14,
  },

  label: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
  },

  text: {
    fontSize: 16,
  },
});
