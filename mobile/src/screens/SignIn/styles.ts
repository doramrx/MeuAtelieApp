import { Dimensions, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    paddingBottom: 100,
    paddingTop: 20
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  signInText: {
    paddingTop: 15,
    fontSize: 35,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50
  },

  button: {
    backgroundColor: "#FC7482",
    paddingVertical: 10,
    width: 130,
    borderRadius: 5,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  textButtonBelow: {
    color: "#CCC",
    fontSize: 17,
    textAlign: "center",
    padding: 20,
  },

  signUpLink: {
    color: "#FC7482",
    fontWeight: "bold",
    padding: 20,
  },
});

