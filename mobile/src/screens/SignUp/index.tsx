import { useState } from "react";
import { Text, View, Image, Alert, TouchableHighlight } from "react-native";
import { Link, useNavigation } from "@react-navigation/native";

import { database } from "../../database/database";

import { styles } from "./styles";
import { THEME } from "../../theme";

import Logo from "../../assets/Logo.png";
import EmailIconFilled from "../../assets/icons/email-icon-filled.svg";
import PasswordIconFilled from "../../assets/icons/password-icon-filled.svg";
import UserIconFilled from "../../assets/icons/user-icon-filled.svg";

import { Input } from "../../components/shared/Input";
import { Screen } from "../../components/shared/Screen";

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
            // console.log(resultSet.rows.length);

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
      .then(() => {
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
    <Screen.Root>
      <Screen.Header additionalStyles={styles.logoContainer}>
        <Image
          source={Logo}
          style={styles.logoImage}
        />
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <Text style={styles.title}>Cadastro</Text>

        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Nome"
          icon={UserIconFilled}
          containerStyles={{ marginBottom: 14 }}
        />
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
          containerStyles={{ marginBottom: 14 }}
        />
        <Input
          value={confirmationPassword}
          onChangeText={setConfirmationPassword}
          placeholder="Confirmar senha"
          isPasswordInput={true}
          icon={PasswordIconFilled}
        />

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
      </Screen.Content>
    </Screen.Root>
  );
}
