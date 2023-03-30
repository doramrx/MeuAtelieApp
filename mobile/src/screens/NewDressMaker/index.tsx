import { DrawerScreenProps } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import FeatherIcons from "@expo/vector-icons/Feather";
import { database } from "../../database/database";

import { styles } from "./styles";

export function NewDressMaker({
    navigation,
}: DrawerScreenProps<ParamListBase, string, "listDressMakers">) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    function handleToggleDrawer() {
        navigation.goBack();
    }

    function handleRegisterNewDressMaker() {
        if (
            name.trim() === "" ||
            phoneNumber.trim() === "" ||
            email.trim() === ""
        ) {
            return Alert.alert("Preencha todos os campos!");
        }

        const registerDressmakerPromise = new Promise((resolve, reject) => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM dressmakers WHERE email = ?",
                    [email],
                    (transaction, resultSet) => {
                        if (resultSet.rows.length !== 0) {
                            return reject("Costureira já cadastrada!");
                        }

                        transaction.executeSql(
                            "INSERT INTO dressmakers (name, email, phoneNumber) VALUES (?, ?, ?);",
                            [name, email, phoneNumber],
                            (_, resultSet) => {
                                if (resultSet.rowsAffected === 1) {
                                    resolve(resultSet.insertId);
                                } else {
                                    reject(
                                        "Não foi possível cadastrar a costureira! Tente novamente."
                                    );
                                }
                            }
                        );
                    }
                );
            });
        });

        registerDressmakerPromise
            .then((userId) => {
                console.log(`userId: ${userId}`);
                navigation.navigate("successScreen", {
                    headerMessage: "Cadastro de costureira",
                    successMessage: "Costureira cadastrada com sucesso!",
                    buttonMessage: "Retornar a listagem",
                    returnTo: "listDressMakers",
                });
            })
            .catch((reason) => {
                Alert.alert("Falha no cadastro", reason);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <FeatherIcons
                        name="arrow-left"
                        color="#FFF"
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.navigatorText}>Cadastrar costureira</Text>
            </View>

            <Text style={styles.title}>Costureira</Text>
            <View style={styles.dressMakerForm}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    style={styles.input}
                />
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Telefone"
                    style={styles.input}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegisterNewDressMaker}
                >
                    <FeatherIcons
                        name="plus"
                        size={20}
                        color="#FFF"
                    />
                    <Text style={styles.buttonText}>Adicionar perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
