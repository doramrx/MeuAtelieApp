import { StyleSheet, Dimensions } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 14,
    paddingHorizontal: 14,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  option: {
    width: 100,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1
  },
  optionText: {
    fontSize: 16,
  },
  firstOption: {
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  lastOption: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },
  activeOption: {
    backgroundColor: THEME.COLORS.PINK.V1,
    borderColor: THEME.COLORS.PINK.V1
  },
  activeOptionText: {
    color: THEME.COLORS.WHITE.FULL_WHITE
  }
});
