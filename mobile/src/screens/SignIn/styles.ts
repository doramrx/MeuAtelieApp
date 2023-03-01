import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
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
    marginBottom: 10
  },

  inputLabel: {
    fontSize: 20,
    paddingLeft: 5,
    marginBottom: 10
  },

  input: {
    backgroundColor: "rgba(255, 239, 241, 0.66)",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 22,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 30
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
