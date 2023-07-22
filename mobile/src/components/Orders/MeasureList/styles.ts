import { Dimensions, StyleSheet } from "react-native";

const ninetyPercentOfScreenWidth = Dimensions.get("screen").width * 0.9;

export const styles = StyleSheet.create({
  measureList: {
    width: ninetyPercentOfScreenWidth,
    marginBottom: 20,
  },
});
