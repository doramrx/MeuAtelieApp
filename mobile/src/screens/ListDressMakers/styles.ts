import { StyleSheet, Platform, Dimensions } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        backgroundColor: "#F5F5F5",
        paddingBottom: 61
    },

    navigator: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 18,
        paddingHorizontal: 25,
        backgroundColor: "#003249",
        height: 65,
    },

    navigatorText: {
        color: "#FFF",
        fontWeight: "500",
        fontSize: 20,
        marginTop: 1.7,
        marginEnd: 140,
    },

    navigatorIcons: {
        resizeMode: "contain",
        width: 30,
    },

    sectionBar: {
        height: 80,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get("window").width * 1,
        paddingVertical: 15,
        paddingHorizontal: 70,
        backgroundColor: "#FFF",
    },

    sectionBarText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "500",
    },

    sectionBarNumber: {
        fontSize: 20,
        fontWeight: "700",
    },

    dressMakerBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },

    actionButtonsContainer: {
        paddingLeft: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    actionButtons: {
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },

    trashButton: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: "#FF4558",
        marginBottom: 6
    },
    editButton: {
        padding: 8,
        backgroundColor: "#003249"
    },

    dressMakerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#FC7482",
        marginRight: 18,
        alignItems: "center",
        justifyContent: "center"
    },
    dressMakerName: {
        fontSize: 20,
        color: "#000",
        marginBottom: 6
    },
    dressMakerPhoneNumber: {
        fontSize: 17,
        color: "#343434"
    },

    footer: {
        backgroundColor: "#003249",
        height: 60,
        width: Dimensions.get("window").width * 1,
        position: "absolute",
        bottom: 0,
    },

    footerAddButton: {
        backgroundColor: "#FC7482",
        height: 65,
        width: 65,
        position: "absolute",
        borderRadius: 50,
        marginHorizontal: Dimensions.get("window").width * 0.41,
        bottom: 30,
    },

    footerAddButtonText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 45,
        fontWeight: "300",
    },
});
