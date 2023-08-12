import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import { THEME } from "../../../../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.6;
const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;

export const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  subtitle: {
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    fontSize: 18 * fontScale,
    color: THEME.COLORS.GRAY.DARK.V2,
  },

  input: {
    marginTop: 16,
    marginBottom: 16,
    width: ninetyPercentOfScreenWidth,
  },

  textarea: {
    width: ninetyPercentOfScreenWidth,
    paddingVertical: (32 * 1) / pixelDensity,
    paddingHorizontal: 24,
    borderRadius: 12,
    fontSize: 18 * fontScale,
    borderBottomWidth: 2,
    color: THEME.COLORS.GRAY.DARK.V3,
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  text: {
    fontSize: 20,
    fontWeight: THEME.FONT.WEIGHT.REGULAR,
    marginTop: 14,
    alignSelf: "flex-start",
  },

  photoContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 20,
  },

  button: {
    width: sixtyPercentOfScreenWidth,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  updateMeasurementsButton: {
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    marginBottom: 20,
    paddingVertical: 16,
  },

  updateMeasurementsContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  measuresText: {
    color: THEME.COLORS.GRAY.MEDIUM.V1,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
    marginLeft: 10,
    fontSize: 18,
  },

  serviceCostWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  serviceCostlabel: {
    fontSize: 18,
    marginRight: 10,
  },

  dueDateWrapper: {
    alignSelf: "flex-start",
  },

  dueDateLabel: {
    fontSize: 18,
    marginVertical: 12,
  },

  dueDatePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: ninetyPercentOfScreenWidth,
    paddingVertical: (32 * 1) / pixelDensity,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderBottomWidth: 2,
    color: THEME.COLORS.GRAY.DARK.V3,
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  dueDateValue: {
    fontSize: 18,
  },

  serviceCountForDueDateText: {
    color: THEME.COLORS.RED,
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 10,
  },

  saveOrderButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
    marginTop: 20,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  saveOrderText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginVertical: 10,
  },

  cancelText: {
    color: THEME.COLORS.GRAY.MEDIUM.V2,
  },
});
