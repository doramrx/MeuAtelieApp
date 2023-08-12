import { StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

export const styles = StyleSheet.create({
  checkButton: {
    position: "absolute",
    right: 15,
    top: 20,
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V1,
    alignItems: "center",
    justifyContent: "center",
  },

  checkedButton: {
    backgroundColor: THEME.COLORS.PINK.V1,
  },
});
