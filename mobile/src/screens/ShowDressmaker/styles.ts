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
        justifyContent: "center",
        backgroundColor: "#003249",
        height: 65,
        paddingHorizontal: 25
    },

    goBackButton: {
        position: "absolute",
        left: 25
    },

    headertext: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 20,
    },

    editDressMakerButton: {
        position: "absolute",
        right: 25
    },

    infoContainer: {
        paddingVertical: 30,
        paddingHorizontal: 22
    },
    title: {
        fontSize: 30,
    },
    infoBlock: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    infoLabel: {
        fontWeight: "700",
        fontSize: 20
    },
    infoContent: {
        fontSize: 18
    }
});