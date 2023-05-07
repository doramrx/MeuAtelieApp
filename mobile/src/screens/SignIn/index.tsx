import { useState, useContext } from "react";
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

import { database } from "../../database/database";

import { AuthContext } from "../../contexts/AuthContext";

import { Input } from "../../components/shared/Input";

import { styles } from "./styles";

import Logo from "../../assets/Logo.png";
import EmailIcon from "../../assets/icons/email-icon.svg";
import PasswordIcon from "../../assets/icons/password-icon.svg";
import { THEME } from "../../theme";

const pixelDensity = PixelRatio.get();

interface UserData {
    id: number;
    isAdm: boolean;
}

export function SignIn() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("adm@adm.com");
    const [password, setPassword] = useState("adm123");

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
                        console.log("teste");

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

                navigation.navigate("tabNavigatorRoutes" as any);
            })
            .catch(() => {
                Alert.alert("Falha no login", "Credenciais inválidas!");
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
                <Text style={styles.title}>Entrar</Text>

                <View>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        leftIcon={
                            <EmailIcon
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
                            <PasswordIcon
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                                color={THEME.COLORS.GRAY.MEDIUM.V2}
                            />
                        }
                    />
                </View>

                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>

                <View style={styles.wrapper}>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                        activeOpacity={0.98}
                        onPress={authenticateUser}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableHighlight>
                    <View style={styles.signUpMessageWrapper}>
                        <Text style={[styles.text, styles.message]}>
                            Não possui conta?
                        </Text>
                        <Link
                            to="/signUp"
                            style={[styles.text, styles.link]}
                        >
                            Cadastrar
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
}
