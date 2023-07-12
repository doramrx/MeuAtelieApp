import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    alignItems: "center",
  },

  mainContainer: {
    flex: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  title: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 22,
  },

  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
