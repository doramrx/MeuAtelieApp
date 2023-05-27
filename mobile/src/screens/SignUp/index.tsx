import { useState } from "react";
import {
    Text,
    View,
    Image,
    Alert,
    TouchableHighlight,
    PixelRatio,
    StatusBar,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import Logo from "../../assets/Logo.png";
import EmailIconFilled from "../../assets/icons/email-icon-filled.svg";
import PasswordIconFilled from "../../assets/icons/password-icon-filled.svg";
import UserIconFilled from "../../assets/icons/user-icon-filled.svg";
import { THEME } from "../../theme";

import { database } from "../../database/database";
import { Input } from "../../components/shared/Input";

const pixelDensity = PixelRatio.get();

export function SignUp() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    function handleSignUp() {
        if (
            !username.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmationPassword.trim()
        ) {
            Alert.alert(
                "Falha ao realizar o cadastro!",
                "Existem campos que não foram preenchidos."
            );
            return;
        }

        const registerUserPromise = new Promise((resolve, reject) => {
            if (password.trim() !== confirmationPassword.trim()) {
                return reject("As senhas informadas não são iguais!");
            }

            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM dressmakers WHERE email = ?;",
                    [email],
                    (transaction, resultSet) => {
                        console.log(resultSet.rows.length);

                        if (resultSet.rows.length !== 0) {
                            return reject("Costureira já cadastrado!");
                        }

                        transaction.executeSql(
                            "INSERT INTO dressmakers (name, email, password) VALUES (?, ?, ?);",
                            [username, email, password],
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
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.mainContainer}>
                <Text style={styles.title}>Cadastro</Text>

                <View>
                    <Input
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nome"
                        leftIcon={
                            <UserIconFilled
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                                color={THEME.COLORS.GRAY.MEDIUM.V2}
                            />
                        }
                        marginBottom={14}
                    />
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        leftIcon={
                            <EmailIconFilled
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                                color={THEME.COLORS.GRAY.MEDIUM.V2}
                            />
                        }
                        marginBottom={14}
                    />
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        isPasswordInput={true}
                        leftIcon={
                            <PasswordIconFilled
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                                color={THEME.COLORS.GRAY.MEDIUM.V2}
                            />
                        }
                        marginBottom={14}
                    />
                    <Input
                        value={confirmationPassword}
                        onChangeText={setConfirmationPassword}
                        placeholder="Confirmar senha"
                        isPasswordInput={true}
                        leftIcon={
                            <PasswordIconFilled
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                                color={THEME.COLORS.GRAY.MEDIUM.V2}
                            />
                        }
                    />
                </View>

                <View style={styles.wrapper}>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                        activeOpacity={0.98}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableHighlight>
                    <View style={styles.signInMessageWrapper}>
                        <Text style={[styles.text, styles.message]}>
                            Já possui uma conta?
                        </Text>
                        <Link
                            to="/signIn"
                            style={[styles.text, styles.link]}
                        >
                            Entrar
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
}
