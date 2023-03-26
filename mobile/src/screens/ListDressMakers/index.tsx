import { DrawerScreenProps } from "@react-navigation/drawer";
import { ParamListBase, useFocusEffect } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import HamburguerIcon from "../../assets/Hamburguer_icon.png";
import { useCallback, useState } from "react";
import { database } from "../../database/database";

interface Dressmaker {
    id: number;
    name: string;
    phoneNumber: string;
}

export function ListDressMakers({
    navigation,
}: DrawerScreenProps<ParamListBase, string, "listDressMakers">) {
    const [dressmakers, setDressmakers] = useState<Dressmaker[]>([]);

    function handleToggleDrawer() {
        navigation.toggleDrawer();
    }

    function handleNavigateToNewDressMakerScreen() {
        navigation.navigate("newDressMaker");
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT id, name, phoneNumber FROM dressmakers;",
                    undefined,
                    (_, resultSet) => {
                        const rawResultSet = resultSet.rows._array;
                        const dressmakersList: Dressmaker[] = rawResultSet.map(
                            (result) => {
                                return {
                                    id: result.id,
                                    name: result.name,
                                    phoneNumber: result.phoneNumber,
                                };
                            }
                        );

                        console.log(dressmakersList);

                        setDressmakers(dressmakersList);
                    }
                );
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <Image
                        source={HamburguerIcon}
                        style={styles.navigatorIcons}
                    />
                </TouchableOpacity>
                <Text style={styles.navigatorText}>Costureiras</Text>
            </View>

            <FlatList
                data={dressmakers}
                renderItem={({ item }) => {
                    return (
                        <View
                            key={item.id}
                            style={styles.dressMakerBlock}
                        >
                            <View style={styles.dressMakerAvatar}></View>
                            <View>
                                <Text style={styles.dressMakerName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.dressMakerPhoneNumber}>
                                    Telefone: {item.phoneNumber}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleNavigateToNewDressMakerScreen}
                    style={styles.footerAddButton}
                >
                    <Text style={styles.footerAddButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
