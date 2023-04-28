import { useCallback, useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {
    ParamListBase,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Card } from "../../components/ListDressMakers/Card/index";

import AddIcon from "../../assets/icons/add-icon.svg";

import { styles } from "./styles";

import { database } from "../../database/database";
import { AuthContext } from "../../contexts/AuthContext";

import { THEME } from "../../theme";

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
            <View style={styles.backContainer}>
                <Text style={styles.title}>Costureiras</Text>
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => {handleNavigateToNewDressMakerScreen()}}
                >
                    <AddIcon width={18}/>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                {dressmakers.map((dressmaker) => {
                    return <Card dressmakerName={dressmaker.name}/>
                })}
            </View>
        </View>  
    )  
}

