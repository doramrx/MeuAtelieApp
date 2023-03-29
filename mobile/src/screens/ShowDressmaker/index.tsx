import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ParamListBase, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/FontAwesome5";

import { styles } from "./styles";
import { useCallback, useState } from "react";
import { database } from "../../database/database";

interface RouteParams {
    id: number;
}

interface DressMakerInfo {
    name: string;
    phoneNumber: string;
    email: string;
}

interface Props
    extends NativeStackScreenProps<ParamListBase, "showDressMaker"> {}

export function ShowDressMaker({ navigation, route }: Props) {
    const routeParams = route.params as RouteParams;

    const [dressMakerInfo, setDressMakerInfo] = useState<DressMakerInfo>();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleEditDressMaker() {
        navigation.navigate("editDressMaker", {
            id: routeParams.id
        });
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT name, email, phoneNumber FROM dressmakers WHERE id = ?",
                    [routeParams.id],
                    (_, resultSet) => {
                        const rawDressMakerData = resultSet.rows._array;

                        if (rawDressMakerData.length === 0) {
                            Alert.alert("Costureira informada não existe!");
                            return navigation.goBack();
                        }

                        const rawDressMakerFields = rawDressMakerData[0];

                        setDressMakerInfo({
                            name: rawDressMakerFields.name,
                            email: rawDressMakerFields.email,
                            phoneNumber: rawDressMakerFields.phoneNumber,
                        });
                    }
                );
            });
        }, [routeParams.id])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon
                        name="arrow-left"
                        color="#FFF"
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.headertext}>Dados da costureira</Text>
                <TouchableOpacity onPress={handleEditDressMaker}>
                    <Icon
                        name="pen"
                        color="#FFF"
                        size={24}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>Costureira</Text>
                <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Nome: </Text>
                    <Text style={styles.infoContent}>
                        {dressMakerInfo?.name}
                    </Text>
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Telefone: </Text>
                    <Text style={styles.infoContent}>
                        {dressMakerInfo?.phoneNumber}
                    </Text>
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Email: </Text>
                    <Text style={styles.infoContent}>
                        {dressMakerInfo?.email}
                    </Text>
                </View>
            </View>
        </View>
    );
}
