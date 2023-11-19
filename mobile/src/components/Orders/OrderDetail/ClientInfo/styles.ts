import { StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientInfoContainer: {
    marginLeft: 12,
  },
  clientName: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
  },
  clientPhone: {
    fontSize: 14,
  },
});
