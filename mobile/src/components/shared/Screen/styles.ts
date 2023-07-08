import { StyleSheet } from "react-native";

import { THEME } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.PINK.V2,
  },

  header: {
    flex: 1,
  },

  content: {
    flex: 10,
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
