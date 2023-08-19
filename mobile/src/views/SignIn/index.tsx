import { useState, useContext } from "react";
import { Text, View, Image, Alert, TouchableHighlight } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";

import { database } from "../../database/database";

import { AuthContext } from "../../contexts/AuthContext";

import { styles } from "./styles";
import { THEME } from "../../theme";

import Logo from "../../assets/Logo.png";
import EmailIconFilled from "../../assets/icons/email-icon-filled.svg";
import PasswordIconFilled from "../../assets/icons/password-icon-filled.svg";

import { Input } from "../../components/shared/Input";
import { Screen } from "../../components/shared/Screen";

interface UserData {
  id: number;
}

export function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("adm@adm.com");
  const [password, setPassword] = useState("adm123");

  const { setSetUserId } = useContext(AuthContext);

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
          "SELECT id FROM dressmakers WHERE email = ? AND password = ?;",
          [email, password],
          (_, resultSet) => {
            if (resultSet.rows.length === 0) {
              reject("Costureira não cadastrado!");
            } else {
              resolve({
                id: resultSet.rows.item(0).id,
              });
            }
          }
        );
      });
    });

    signInUserPromise
      .then((user) => {
        setSetUserId(user.id);

        Alert.alert("Login realizado com sucesso!");

        navigation.navigate("tabNavigatorRoutes");
      })
      .catch(() => {
        Alert.alert("Falha no login", "Credenciais inválidas!");
      });
  }

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.logoContainer}>
        <Image
          source={Logo}
          style={styles.logoImage}
        />
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <Text style={styles.title}>Entrar</Text>

        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          icon={EmailIconFilled}
          containerStyles={{ marginBottom: 14 }}
        />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          isPasswordInput={true}
          icon={PasswordIconFilled}
        />

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
            <Text style={[styles.text, styles.message]}>Não possui conta?</Text>

            <Link
              to="/signUp"
              style={[styles.text, styles.link]}
            >
              Cadastrar
            </Link>
          </View>
        </View>
      </Screen.Content>
    </Screen.Root>
  );
}
