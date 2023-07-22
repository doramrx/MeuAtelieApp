import { StyleSheet } from "react-native";
import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  nameText: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V3,
    paddingLeft: 6,
  },

  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  valueText: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V3,
    marginRight: 4,
  },

  unitText: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V3,
  },
});
