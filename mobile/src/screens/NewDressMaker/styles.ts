import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        backgroundColor: "#F5F5F5",
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

    title: {
        marginTop: 50,
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "500"
    },

    dressMakerForm: {
        paddingHorizontal: 20,
        marginTop: 10,
        
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#B2B2B2",
        paddingVertical: 6,
        fontSize: 20,
        marginVertical: 10
    },

    button: {
        backgroundColor: "#003249",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
        width: "60%",
        alignSelf: "center",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "400",
        marginLeft: 15
    }
})