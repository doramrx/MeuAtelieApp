import { Image, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../theme";
import Logo from "../../assets/Logo.png";

import { Screen } from "../../components/shared/Screen";

export function Inaugural() {
  const navigation = useNavigation();

  function navigateTo(path: "signIn" | "signUp") {
    navigation.navigate(path);
  }

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.logoContainer}>
        <Image
          source={Logo}
          style={styles.logoImage}
        />
      </Screen.Header>

      <Screen.Content additionalStyles={styles.welcomeContainer}>
        <Text style={styles.title}>Bem vindo (a)</Text>
        <Text style={styles.message}>
          O melhor aplicativo para organizar o seu Ateliê!
        </Text>

        <TouchableHighlight
          style={[styles.button, styles.firstButton]}
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          activeOpacity={0.98}
          onPress={() => {
            navigateTo("signIn");
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          activeOpacity={0.98}
          onPress={() => {
            navigateTo("signUp");
          }}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableHighlight>
      </Screen.Content>
    </Screen.Root>
  );
}
