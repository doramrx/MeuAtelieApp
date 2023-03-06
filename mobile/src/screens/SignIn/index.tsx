import { useState, useContext } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import FeatherIcons from "@expo/vector-icons/Feather";
import { database } from "../../database/database";

import { AuthContext } from "../../contexts/AuthContext";

import { styles } from "./styles";

import LogoImage from "../../assets/Logo.png";

export function SignIn() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { setSetUserId } = useContext(AuthContext);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  function authenticateUser() {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Erro ao realizar o login",
        "Preencha todos os campos para realizar o login."
      );
      return;
    }

    const signInUserPromise = new Promise((resolve, reject) => {
      database.transaction((transaction) => {
        transaction.executeSql(
          "SELECT id FROM users WHERE email = ? AND password = ?;",
          [email, password],
          (_, resultSet) => {
            console.log(resultSet.rows.length);

            if (resultSet.rows.length === 0) {
              reject("Usuário não cadastrado!");
            } else {
              resolve({
                userId: resultSet.rows.item(0).id,
              });
            }
          }
        );
      });
    });

    signInUserPromise
      .then((userId) => {
        console.log(`userId: `, userId);
        setSetUserId(userId as number);

        Alert.alert("Login realizado com sucesso!");

        navigation.navigate("home");

      })
      .catch(() => {
        Alert.alert(
          "Falha no login",
          "Credenciais inválidas!"
        );
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImage} />
        <Text style={styles.signInText}>Entrar</Text>
      </View>

      <View>
        <View style={[styles.inputContainer, styles.firstInputContainer]}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
        <TouchableOpacity style={styles.button} onPress={authenticateUser}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.textButtonBelow}>
          Não possui conta?
          <Link to={{ screen: "signUp" }} style={styles.signUpLink}>
            {" "}
            Cadastrar
          </Link>
        </Text>
      </View>
    </View>
  );
}
