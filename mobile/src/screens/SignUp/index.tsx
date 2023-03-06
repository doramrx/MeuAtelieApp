import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import FeatherIcons from "@expo/vector-icons/Feather";

import { styles } from "./styles";
import LogoImage from "../../assets/Logo.png";

import { database } from "../../database/database";

export function SignUp() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("teste");
  const [email, setEmail] = useState("teste@gmail.com");
  const [password, setPassword] = useState("12345");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

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
        <View style={[styles.inputContainer, styles.firstInputContainer]}>
          <Text style={styles.inputLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              textContentType="password"
              placeholder="* * * * * * * *"
              secureTextEntry={!isPasswordVisible}
            ></TextInput>

            <TouchableOpacity
              style={styles.togglePasswordVisibilityButton}
              onPress={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <FeatherIcons name="eye-off" size={32} color="#666" />
              ) : (
                <FeatherIcons name="eye" size={32} color="#666" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.textButtonBelow}>
          Já possui conta?
          <Link to={{ screen: "signIn" }} style={styles.signUpLink}>
            {" "}
            Entrar
          </Link>
        </Text>
      </View>
    </View>
  );
}
