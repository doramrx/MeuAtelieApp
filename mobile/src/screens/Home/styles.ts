import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor:"#F5F5F5"
  },

  navigator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: "#003249",
    height: 65
  },

  navigatorText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 1.7,
    marginEnd: 140
  },

  navigatorIcons: {
    resizeMode: "contain",
    width: 30
  },

  sectionBar: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 1,
    paddingVertical: 15,
    paddingHorizontal: 70,
    backgroundColor: "#FFF"
  },

  sectionBarText: {
    textAlign: "center",
    fontSize: 15, 
    fontWeight: "500"
  },

  sectionBarNumber: {
    fontSize: 20,
    fontWeight: "700"
  },

  listServices: {
    height: 120,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DBDBDB"
  },

  listServicesTextGroup: {
    padding: 20,
    paddingVertical: 18
  },

  listServicesText: { 
    fontSize: 15
  },

  footer: {
    backgroundColor: "#003249",
    height:60,
    width: Dimensions.get("window").width * 1,
    position: "absolute",
    bottom: 0
  },

  footerAddButton: {
    backgroundColor: "#FC7482",
    height: 65,
    width: 65,
    position: "absolute",
    borderRadius: 50, 
    marginHorizontal: Dimensions.get("window").width * 0.41,
    bottom: 30
  },

  footerAddButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 45,
    fontWeight: "300"
  },

});
