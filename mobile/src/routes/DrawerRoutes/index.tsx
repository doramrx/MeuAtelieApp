import { Image, Text, View } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerContentComponentProps,
    DrawerItemList,
} from "@react-navigation/drawer";

import { styles } from "./styles";
import FooterLogoImage from "../../assets/footer_logo.png";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Orders } from "../../screens/Orders";

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerRoutes() {
    return (
        <Navigator
            initialRouteName="orders"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                swipeEnabled: false,
            }}
        >
            <Screen
                name="orders"
                component={Orders}
                options={{
                    drawerIcon: ({ focused }) => {
                        return (
                            <Icon
                                name="shopping-bag"
                                color={focused ? "#FC7482" : "#999999"}
                                size={18}
                            />
                        );
                    },
                    drawerActiveBackgroundColor: "#F8F8F8",
                    drawerActiveTintColor: "#FC7482",
                    drawerLabel: "Pedidos",
                }}
            />
        </Navigator>
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView
            style={styles.container}
            contentContainerStyle={{
                height: "100%",
            }}
            {...props}
        >
            <View style={styles.profileContainer}>
                <View style={styles.profileAvatar} />
                <Text style={styles.username}>Name Surname</Text>
                <Text style={styles.phoneNumber}>(47) 9 9956-7458</Text>
            </View>

            <View
                style={{
                    maxHeight: "60%",
                    overflow: "scroll",
                }}
            >
                <DrawerItemList {...props} />
            </View>

            <Image
                source={FooterLogoImage}
                style={styles.logoImage}
            />
        </DrawerContentScrollView>
    );
}
