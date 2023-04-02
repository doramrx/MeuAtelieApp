import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: "100%"
    },

    profileContainer: {
        paddingHorizontal: 12,
        marginBottom: 14,
        position: "relative",
    },

    profileAvatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#DDD",
        marginLeft: 8,
        marginBottom: 7
    },

    logOutButton: {
        paddingVertical: 10,
        paddingHorizontal: 95,
        borderWidth: 1,
        borderColor: "#FC7482",
        backgroundColor: "#FC7482",
        borderRadius: 10
    },

    username: {
        fontSize: 24,
        marginLeft: 5
    },

    footer: {
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: 10
    },

    phoneNumber: {
        fontSize: 15,
        color: "#464646",
        marginLeft: 5
    },

    logoImage: {
        width: 137,
        height: 130,
        marginLeft: 28
    }
});