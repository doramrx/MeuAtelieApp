import { StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingRight: 46,
  },

  withoutPadding: {
    paddingRight: 0,
  },

  text: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    color: THEME.COLORS.PINK.V1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 36,
  },
});
