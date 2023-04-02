import { useState, useContext } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { database } from "../../database/database";

import { AuthContext } from "../../contexts/AuthContext";

import { styles } from "./styles";

import LogoImage from "../../assets/Logo.png";
import { Input } from "../../components/shared/Input";
import { PasswordInput } from "../../components/shared/PasswordInput";

interface UserData {
    id: number;
    isAdm: boolean;
}

export function SignIn() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setSetUserId, setIsAdm } = useContext(AuthContext);

    function authenticateUser() {
        if (!email.trim() || !password.trim()) {
            Alert.alert(
                "Erro ao realizar o login",
                "Preencha todos os campos para realizar o login."
            );
            return;
        }

        const signInUserPromise = new Promise<UserData>((resolve, reject) => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT id, isAdm FROM dressmakers WHERE email = ? AND password = ?;",
                    [email, password],
                    (_, resultSet) => {
                        console.log(resultSet.rows.length);

                        if (resultSet.rows.length === 0) {
                            reject("Costureira não cadastrado!");
                        } else {
                            resolve({
                                id: resultSet.rows.item(0).id,
                                isAdm: resultSet.rows.item(0).isAdm === 1,
                            });
                        }
                    }
                );
            });
        });

        signInUserPromise
            .then((user) => {
                console.log(`dressmakerId: `, user.id, " isAdm: ", user.isAdm);
                setSetUserId(user.id);
                setIsAdm(user.isAdm);

                Alert.alert("Login realizado com sucesso!");

                navigation.navigate("homeDrawerRoutes");
            })
            .catch(() => {
                Alert.alert("Falha no login", "Credenciais inválidas!");
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={LogoImage} />
                <Text style={styles.signInText}>Entrar</Text>
            </View>

            <View>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
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
                    onPress={authenticateUser}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <Text style={styles.textButtonBelow}>
                    Não possui conta?
                    <Link
                        to={{ screen: "signUp" }}
                        style={styles.signUpLink}
                    >
                        {" "}
                        Cadastrar
                    </Link>
                </Text>
            </View>
        </View>
    );
}
