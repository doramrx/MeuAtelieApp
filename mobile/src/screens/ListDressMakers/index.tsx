import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";
import {
    ParamListBase,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import { Swipeable } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/FontAwesome5";

import { styles } from "./styles";

import HamburguerIcon from "../../assets/Hamburguer_icon.png";
import { database } from "../../database/database";

interface Dressmaker {
    id: number;
    name: string;
    phoneNumber: string;
}

export function ListDressMakers({
    navigation,
}: DrawerScreenProps<ParamListBase, "listDressMakers">) {
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
                        <DressMakerItem
                            id={item.id}
                            name={item.name}
                            phoneNumber={item.phoneNumber}
                        />
                    );
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View
                            style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#D9D9D9",
                            }}
                        />
                    );
                }}
                ListFooterComponent={() => {
                    return (
                        <View
                            style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: "#D9D9D9",
                            }}
                        />
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

function DressMakerItem({ id, name, phoneNumber }: Dressmaker) {
    return (
        <Swipeable
            onSwipeableOpen={(direction) => {
                if (direction === "right") {
                    return;
                }
            }}
            renderLeftActions={() => <LeftItem id={id} />}
            overshootLeft={false}
        >
            <View
                key={id}
                style={styles.dressMakerBlock}
            >
                <View style={styles.dressMakerAvatar}></View>
                <View>
                    <Text style={styles.dressMakerName}>{name}</Text>
                    <Text style={styles.dressMakerPhoneNumber}>
                        Telefone: {phoneNumber}
                    </Text>
                </View>
            </View>
        </Swipeable>
    );
}

function LeftItem(props: { id: number }) {
    const navigation = useNavigation();

    function handleNavigateToInfoPage() {
        navigation.navigate("showDressMaker", {
            id: props.id,
        });
    }

    return (
        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
                style={[styles.trashButton, styles.actionButtons]}
            >
                <Icon
                    name="trash"
                    size={15}
                    color="#FFF"
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.editButton, styles.actionButtons]}
                onPress={handleNavigateToInfoPage}
            >
                <Text>
                    <Icon
                        name="pen"
                        size={15}
                        color="#FFF"
                    />
                </Text>
            </TouchableOpacity>
        </View>
    );
}
