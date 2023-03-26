import { DrawerScreenProps } from "@react-navigation/drawer";
import {
    ParamListBase,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { database } from "../../database/database";

import { styles } from "./styles";

interface RouteParams {
    id: number;
}

interface Props
    extends DrawerScreenProps<ParamListBase, "showDressMaker"> {}

export function EditDressMaker({ route, navigation }: Props) {
    const routeParams = route.params as RouteParams;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function handleGoBack() {
        navigation.goBack();
    }

    function handleUpdateDressMaker() {
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            phoneNumber.trim() === ""
        ) {
            return Alert.alert(
                "Erro ao atualizar costureira!",
                "Preencha todos os campos!"
            );
        }

        const updateDressMakerPromise = new Promise((resolve, reject) => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM dressmakers WHERE email = ? AND NOT id = ?;",
                    [email, routeParams.id],
                    (transaction, resultSet) => {
                        console.log(resultSet.rows.length);

                        if (resultSet.rows.length !== 0) {
                            return reject("Email em uso!");
                        }

                        transaction.executeSql(
                            "UPDATE dressmakers SET name = ?, email = ?, phoneNumber = ? WHERE id = ?;",
                            [name, email, phoneNumber, routeParams.id],
                            (_, resultSet) => {
                                if (resultSet.rowsAffected === 1) {
                                    resolve(null);
                                } else {
                                    reject(
                                        "Não foi possível atualizar a costureira! Tente novamente."
                                    );
                                }
                            }
                        );
                    }
                );
            });
        });

        updateDressMakerPromise
            .then((something) => {
                Alert.alert("Sucesso!", "Costureira atualizada com sucesso!");
                return navigation.navigate("listDressMakers");
            })
            .catch((error) => {
                Alert.alert("Erro!", error);
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
                            return navigation.navigate("homeDrawerRoutes");
                        }

                        const rawDressMakerFields = rawDressMakerData[0];

                        setName(rawDressMakerFields.name);
                        setEmail(rawDressMakerFields.email);
                        setPhoneNumber(rawDressMakerFields.phoneNumber);
                    }
                );
            });
        }, [routeParams.id])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.goBackButton}
                >
                    <Icon
                        name="arrow-left"
                        color="#FFF"
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.headertext}>Editar costureira</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>Costureira</Text>
                <View style={styles.infoBlock}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.input}
                    />
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleUpdateDressMaker}
                    style={styles.button}
                >
                    <Icon
                        name="check"
                        color="#FFF"
                        size={20}
                    />
                    <Text style={styles.buttonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
