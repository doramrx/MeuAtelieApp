import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";

import { styles } from "./styles";

import LogoImage from "../../assets/Logo.png";

export function SignUp() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImage} />
        <Text style={styles.signInText}>Cadastrar</Text>
      </View>
      <View>
        <View style={[
          styles.inputContainer, 
          styles.firstInputContainer
          ]}
        >
          <Text style={styles.inputLabel}>Nome</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            style={styles.input}>
            
          </TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.textButtonBelow}>
          Já possui conta?
          <Text style={styles.signUpLink}>  Entrar</Text>
        </Text>
      </View>
    </View>
  );
}
