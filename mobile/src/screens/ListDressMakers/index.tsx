import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    ParamListBase,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";

import { Swipeable } from "react-native-gesture-handler";

import FeatherIcons from "@expo/vector-icons/Feather";

import { styles } from "./styles";

import HamburguerIcon from "../../assets/Hamburguer_icon.png";
import { database } from "../../database/database";

interface Dressmaker {
    id: number;
    name: string;
    phoneNumber: string;
}

interface DressmakerItem extends Dressmaker {
    onDeleteDressMaker: () => void;
}

export function ListDressMakers({
    navigation,
}: DrawerScreenProps<ParamListBase, "listDressMakers">) {
    const [dressmakers, setDressmakers] = useState<Dressmaker[]>([]);
    const [keyForRefreshing, setKeyForRefreshing] = useState(0);

    function handleToggleDrawer() {
        navigation.toggleDrawer();
    }

    function handleNavigateToNewDressMakerScreen() {
        navigation.navigate("newDressMaker");
    }

    function onDeleteDressMaker() {
        setKeyForRefreshing(keyForRefreshing + 1);
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
                        setDressmakers(dressmakersList);
                    }
                );
            });
        }, [keyForRefreshing])
    );

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <FeatherIcons
                        name="menu"
                        color="#FFFFFF"
                        size={30}
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
                            onDeleteDressMaker={onDeleteDressMaker}
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

function DressMakerItem({
    id,
    name,
    phoneNumber,
    onDeleteDressMaker,
}: DressmakerItem) {
    return (
        <Swipeable
            onSwipeableOpen={(direction) => {
                if (direction === "right") {
                    return;
                }
            }}
            renderLeftActions={() => (
                <LeftItem
                    id={id}
                    onDeleteDressMaker={onDeleteDressMaker}
                />
            )}
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

function LeftItem({
    id,
    onDeleteDressMaker,
}: {
    id: number;
    onDeleteDressMaker: () => void;
}) {
    const navigation = useNavigation();

    function handleNavigateToInfoPage() {
        navigation.navigate("showDressMaker", {
            id,
        });
    }

    function removeDressMakerFromDatabase() {
        database.transaction((transaction) => {
            transaction.executeSql(
                "DELETE FROM dressmakers WHERE id = ?;",
                [id],
                (_, resultSet) => {
                    if (resultSet.rowsAffected === 1) {
                        Alert.alert(
                            "Sucesso!",
                            "Costureira removida com sucesso"
                        );
                    } else {
                        Alert.alert(
                            "Erro!",
                            "Houve um erro ao deletar a costureira."
                        );
                    }
                }
            );
        });
    }

    function handleDeleteDressMaker() {
        Alert.alert(
            "Confirmação",
            "Deseja realmente remover esta costureira?",
            [
                {
                    text: "Sim",
                    style: "default",
                    onPress: () => {
                        removeDressMakerFromDatabase();
                        onDeleteDressMaker();
                    },
                },
                {
                    text: "Não",
                    style: "cancel",
                    onPress: () => {},
                },
            ]
        );
    }

    return (
        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
                style={[styles.trashButton, styles.actionButtons]}
                onPress={handleDeleteDressMaker}
            >
                <FeatherIcons
                    name="trash-2"
                    size={15}
                    color="#FFF"
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.editButton, styles.actionButtons]}
                onPress={handleNavigateToInfoPage}
            >
                <Text>
                    <FeatherIcons
                        name="edit-2"
                        size={15}
                        color="#FFF"
                    />
                </Text>
            </TouchableOpacity>
        </View>
    );
}
