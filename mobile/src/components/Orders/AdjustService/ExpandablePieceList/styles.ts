import { PixelRatio, StyleSheet } from "react-native";
import { THEME } from "../../../../theme";

const fontScale = PixelRatio.getFontScale();
const pixelDensity = PixelRatio.get();

export const styles = StyleSheet.create({
  descriptionTextArea: {
    paddingVertical: (32 * 1) / pixelDensity,
    paddingHorizontal: 24,
    borderRadius: 12,
    fontSize: 18 * fontScale,
    borderBottomWidth: 2,
    color: THEME.COLORS.GRAY.DARK.V3,
    backgroundColor: THEME.COLORS.GRAY.LIGHT.V2,
    borderBottomColor: THEME.COLORS.GRAY.LIGHT.V1,
    marginBottom: 14,
  },

  adjustListText: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 14,
  },
});
