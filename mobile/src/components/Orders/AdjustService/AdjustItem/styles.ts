import { StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
    marginBottom: 10,
    paddingHorizontal: 3,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY.MEDIUM.V2,
  },

  text: {
    fontSize: 16,
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkBoxButton: {
    width: 28,
    height: 28,
    marginLeft: 14,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: THEME.COLORS.GRAY.MEDIUM.V2,
    alignItems: "center",
    justifyContent: "center",
  },

  checkedBoxButton: {
    backgroundColor: THEME.COLORS.PINK.V1,
    borderWidth: 0,
  },
});
