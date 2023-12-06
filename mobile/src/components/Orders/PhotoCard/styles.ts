import { StyleSheet } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  photoCard: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    width: 100,
    height: 100,
  },

  photoIcon: {
    marginLeft: 4,
    marginTop: 5
  },

  photoCardText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },
});
