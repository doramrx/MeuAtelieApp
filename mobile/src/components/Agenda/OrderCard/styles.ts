import { StyleSheet } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    borderLeftWidth: 4,
    borderColor: THEME.COLORS.PINK.V2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
    paddingVertical: 14,
  },

  orderFinished: {
    borderColor: THEME.COLORS.GREEN,
  },

  firstInfoBlock: {
    marginBottom: 8,
  },

  infoBlock: {
    flexDirection: "row",
    gap: 10,
  },

  text: {
    fontSize: 16,
  },

  dueDateText: {
    position: "absolute",
    top: 14,
    right: 10,
  },

  adjustItem: {
    marginLeft: 20,
  },
});
