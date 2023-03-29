import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputContainer: {
        width: Dimensions.get("window").width * 0.85,
    },
    inputLabel: {
        fontSize: 20,
        paddingLeft: 5,
        marginTop: 7,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "rgba(255, 239, 241, 0.66)",
        borderWidth: 1,
        borderColor: "rgb(250, 200, 206)",
        paddingVertical: 10,
        paddingHorizontal: 15,
        paddingRight: 48,
        borderRadius: 10,
        fontSize: 22,
    },
    passwordInputContainer: {
        position: "relative",
    },

    togglePasswordVisibilityButton: {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 14,
    },
});
