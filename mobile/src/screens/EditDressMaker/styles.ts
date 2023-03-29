import { Platform, StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#003249",
        height: 65,
    },

    goBackButton: {
        position: "absolute",
        left: 18,
        zIndex: 2
    },

    headertext: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    },

    infoContainer: {
        paddingVertical: 30,
        paddingHorizontal: 22,
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        alignSelf: "flex-start"
    },
    infoBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20

    },
    label: {
        flex: 1,
        fontSize: 18
    },
    input: {
        borderColor: "#B2B2B2",
        borderWidth: 1,
        borderRadius: 5,
        flex: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 18
    },
    button: {
        backgroundColor: "#00B407",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "60%",
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 20
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFF"
    },
});
