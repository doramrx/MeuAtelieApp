import { useContext, useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerContentComponentProps,
    DrawerItemList,
} from "@react-navigation/drawer";
import FeatherIcons from "@expo/vector-icons/Feather";

import { styles } from "./styles";
import FooterLogoImage from "../../assets/footer_logo.png";

import { Orders } from "../../screens/Orders";
import { ListDressMakers } from "../../screens/ListDressMakers";

import { AuthContext } from "../../contexts/AuthContext";
import { database } from "../../database/database";
import { useNavigation } from "@react-navigation/native";

const { Navigator, Screen } = createDrawerNavigator();

export function DrawerRoutes() {
    return (
        <Navigator
            initialRouteName="orders"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="orders"
                component={Orders}
                options={{
                    drawerIcon: ({ focused }) => {
                        return (
                            <FeatherIcons
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
            <Screen
                name="listDressMakers"
                component={ListDressMakers}
                options={{
                    drawerIcon: ({ focused }) => {
                        return (
                            <FeatherIcons
                                name="user"
                                color={focused ? "#FC7482" : "#999999"}
                                size={18}
                            />
                        );
                    },
                    drawerActiveBackgroundColor: "#F8F8F8",
                    drawerActiveTintColor: "#FC7482",
                    drawerLabel: "Costureiras",
                }}
            />
        </Navigator>
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { userId } = useContext(AuthContext);
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        database.transaction((transaction) => {
            transaction.executeSql(
                "SELECT name, phoneNumber FROM dressmakers WHERE id = ?;",
                [userId],
                (_, resultSet) => {
                    console.log(resultSet);

                    if (resultSet.rows._array.length === 0) {
                        Alert.alert("Costureira informada não está cadastrada!");
                        navigation.navigate("signIn");
                    } else {
                        setName(resultSet.rows.item(0).name);
                        setPhoneNumber(resultSet.rows.item(0).phoneNumber);
                    }
                }
            );
        });
    }, [userId]);

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
                <Text style={styles.username}>{name}</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
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
