import { Dimensions, StyleSheet } from "react-native";

import { THEME } from "../../../../theme";

const sixtyPercentOfScreenWidth = Dimensions.get("screen").width * 0.8;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.COLORS.BLACK,
  },

  photoContainer: {
    flex: 2,
    marginTop: 48,
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },

  button: {
    width: sixtyPercentOfScreenWidth,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: THEME.FONT.WEIGHT.MEDIUM,
  },

  removePhotoButton: {
    backgroundColor: THEME.COLORS.PINK.V2,
    marginBottom: 6,
  },

  removePhotoButtonText: {
    color: THEME.COLORS.WHITE.FULL_WHITE,
  },

  closeModalButton: {
    borderWidth: 1,
    backgroundColor: THEME.COLORS.WHITE.FULL_WHITE,
    borderColor: THEME.COLORS.GRAY.LIGHT.V1,
  },

  closeModalButtonText: {
    color: THEME.COLORS.GRAY.DARK.V3,
  },
});
