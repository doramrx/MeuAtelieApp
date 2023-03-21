import { Dimensions, Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";

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

  inputContainer: {
    width: Dimensions.get("window").width * 0.85,
  },

  firstInputContainer: {
    marginBottom: 1
  },

  inputLabel: {
    fontSize: 20,
    paddingLeft: 5,
    marginTop: 7,
    marginBottom: 5
  },

  input: {
    backgroundColor: "rgba(255, 239, 241, 0.66)",
    borderWidth: 1,
    borderColor: "rgb(250, 200, 206)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 22,
  },

  passwordInputContainer: {
    position: "relative"
  },

  togglePasswordVisibilityButton: {
    position: "absolute",
    right: 10,
    top: 8.5
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
  },
});
