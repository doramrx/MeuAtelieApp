import { useCallback, useContext, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

import {
    ParamListBase,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Swipeable } from "react-native-gesture-handler";

import FeatherIcons from "@expo/vector-icons/Feather";

import { styles } from "./styles";

import { database } from "../../database/database";
import { AuthContext } from "../../contexts/AuthContext";

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
}: BottomTabScreenProps<ParamListBase, "listDressMakers">) {
    const { userId, isAdm } = useContext(AuthContext);
    
    const [dressmakers, setDressmakers] = useState<Dressmaker[]>([]);
    const [keyForRefreshing, setKeyForRefreshing] = useState(0);
    const [reachedLimit, setReachedLimit] = useState(false);
    const [lowerOffsetBound, setLowerOffsetBound] = useState(0);

    function handleToggleDrawer() {
        // navigation.toggleDrawer();
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
                    `SELECT id, name, phoneNumber 
                    FROM dressmakers 
                    WHERE NOT id = ? 
                    AND id > ${lowerOffsetBound}
                    ORDER BY id
                    LIMIT 20;`,
                    [userId],
                    (_, resultSet) => {
                        const rawResultSet = resultSet.rows._array;

                        if (rawResultSet.length === 0) {
                            setReachedLimit(true);
                            return;
                        } else {
                            if (reachedLimit) {
                                setReachedLimit(false);
                            }
                        }

                        for (const item of rawResultSet) {
                            console.log(item);
                        }

                        const newDressmakersList: Dressmaker[] = rawResultSet.map(
                            (result) => {
                                return {
                                    id: result.id,
                                    name: result.name,
                                    phoneNumber: result.phoneNumber,
                                };
                            }
                        );

                        setLowerOffsetBound(newDressmakersList[newDressmakersList.length - 1].id);
                        console.log(lowerOffsetBound);

                        setDressmakers([...dressmakers, ...newDressmakersList]);
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
                onEndReached={(info) => {
                    setKeyForRefreshing(keyForRefreshing + 1);
                }}
            />

            {isAdm && (
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={handleNavigateToNewDressMakerScreen}
                        style={styles.footerAddButton}
                    >
                        <Text style={styles.footerAddButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            )}
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
                <View style={styles.dressMakerAvatar}>
                    <FeatherIcons
                        name="user"
                        color="#FFF"
                        size={32}
                    />
                </View>
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
    const { isAdm } = useContext(AuthContext);
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
            {isAdm && (
                <TouchableOpacity
                    style={[styles.trashButton, styles.actionButtons]}
                    onPress={handleDeleteDressMaker}
                >
                    <FeatherIcons
                        name="trash-2"
                        size={20}
                        color="#FFF"
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.editButton, styles.actionButtons]}
                onPress={handleNavigateToInfoPage}
            >
                {isAdm ? (
                    <Text>
                        <FeatherIcons
                            name="edit-2"
                            size={20}
                            color="#FFF"
                        />
                    </Text>
                ) : (
                    <Text>
                        <FeatherIcons
                            name="info"
                            size={20}
                            color="#FFF"
                        />
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
