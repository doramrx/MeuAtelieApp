import { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import LogoImage from "../../assets/Logo.png";

import { database } from "../../database/database";
import { Input } from "../../components/shared/Input";
import { PasswordInput } from "../../components/shared/PasswordInput";

export function SignUp() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("teste");
    const [email, setEmail] = useState("teste@gmail.com");
    const [password, setPassword] = useState("12345");

    function handleSignUp() {
        if (!username.trim() || !email.trim() || !password.trim()) {
            Alert.alert(
                "Falha ao realizar o cadastro!",
                "Existem campos que não foram preenchidos."
            );
            return;
        }

        const registerUserPromise = new Promise((resolve, reject) => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM users WHERE email = ?",
                    [email],
                    (transaction, resultSet) => {
                        console.log(resultSet.rows.length);

                        if (resultSet.rows.length !== 0) {
                            return reject("Usuário já cadastrado!");
                        }

                        transaction.executeSql(
                            "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
                            [username, email, password],
                            (_, resultSet) => {
                                if (resultSet.rowsAffected === 1) {
                                    resolve(resultSet.insertId);
                                } else {
                                    reject(
                                        "Não foi possível cadastrar o usuário! Tente novamente."
                                    );
                                }
                            }
                        );
                    }
                );
            });
        });

        registerUserPromise
            .then((userId) => {
                console.log(`userId: ${userId}`);
                Alert.alert(
                    "Cadastro realizado com sucesso!",
                    "Usuário cadastrado com sucesso!"
                );
                navigation.navigate("signIn");
            })
            .catch((reason) => {
                Alert.alert("Falha no cadastro", reason);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={LogoImage} />
                <Text style={styles.signInText}>Cadastrar</Text>
            </View>

            <View>
                <Input
                    label="Nome"
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <PasswordInput
                    label="Senha"
                    inputValue={password}
                    onInputChangeText={setPassword}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={styles.textButtonBelow}>
                    Já possui conta?
                    <Link
                        to={{ screen: "signIn" }}
                        style={styles.signInLink}
                    >
                        {" "}
                        Entrar
                    </Link>
                </Text>
            </View>
        </View>
    );
}
