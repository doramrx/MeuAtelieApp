import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#F5F5F5",
    },

    navigator: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 18,
        paddingHorizontal: 25,
        backgroundColor: "#003249",
        height: 65,
    },

    navigatorText: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 21,
    },

    content: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },

    successMessage: {
        marginTop: 16,
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
        maxWidth: "90%",
    },

    successIcon: {
        borderWidth: 1,
        borderColor: "#00B407",
        padding: 10,
        borderRadius: 50
    },

    goBackButton: {
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#003249",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 20
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        marginLeft: 12
    }

});
