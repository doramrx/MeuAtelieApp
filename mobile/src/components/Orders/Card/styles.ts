import { StyleSheet } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: 65,
    height: 65,
    backgroundColor: THEME.COLORS.PINK.V1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderTitle: {
    fontSize: 19,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginLeft: 15,
  },
  orderText: {
    fontSize: 14,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginLeft: 15,
  },
  orderDueDate: {
    fontSize: 14,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginLeft: 15,
  },
});
