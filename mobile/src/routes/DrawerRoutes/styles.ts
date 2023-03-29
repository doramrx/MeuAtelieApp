import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: "100%"
    },

    profileContainer: {
        paddingHorizontal: 12,
        marginBottom: 14
    },

    profileAvatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#DDD",
        marginLeft: 8,
        marginBottom: 7
    },

    username: {
        fontSize: 24,
        marginLeft: 5
    },

    phoneNumber: {
        fontSize: 15,
        color: "#464646",
        marginLeft: 5
    },

    logoImage: {
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        width: 137,
        height: 130
    }
});