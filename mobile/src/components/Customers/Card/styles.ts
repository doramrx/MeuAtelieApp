import { StyleSheet, Platform, Dimensions } from "react-native";
import Constants from "expo-constants";
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
  customerName: {
    fontSize: 18,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginLeft: 15,
  },
  customerPhone: {
    fontSize: 14,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    color: THEME.COLORS.GRAY.DARK.V2,
    marginLeft: 15,
  },
})