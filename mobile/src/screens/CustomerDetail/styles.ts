import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.PINK.V2,
  },
  backContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    alignItems: "center",
  },
  title: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    fontSize: 22,
    marginRight: 130,
  },
  mainContainer: {
    flex: 10,
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  editButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowButton: {
    width: 30,
    height: 30,
  },
  personalDataContainer: {
    flex: 1,
  },
  personalDataTitle: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    fontSize: 21,
    paddingTop: 15,
    paddingLeft: 18,
    paddingBottom: 12,
  },
  personalData: {
    paddingLeft: 18,
    fontSize: 16,
    paddingBottom: 7,
  },
  orderDataContainer: {
    flex: 4,
  },
  orderDataTitle: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
    fontSize: 21,
    paddingTop: 15,
    paddingLeft: 18,
    paddingBottom: 12,
  },
  alternativeText: {
    paddingTop: 13,
    textAlign: "center",
    fontSize: 16,
    color: THEME.COLORS.GRAY.MEDIUM.V1,
  },
});