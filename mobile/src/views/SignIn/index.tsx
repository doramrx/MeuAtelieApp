import { Text, View, Image, TouchableHighlight } from "react-native";
import { Link } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../theme";

import Logo from "../../assets/Logo.png";
import EmailIconFilled from "../../assets/icons/email-icon-filled.svg";
import PasswordIconFilled from "../../assets/icons/password-icon-filled.svg";

import { Input } from "../../components/shared/Input";
import { Screen } from "../../components/shared/Screen";
import { SignInViewControllerData, useViewController } from "./view-controller";

interface Props {
  controller?: () => SignInViewControllerData;
}

export function SignIn({ controller }: Props) {
  const viewController = controller ? controller() : useViewController();

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
          value={viewController.email}
          onChangeText={viewController.onUpdateEmail}
          placeholder="Email"
          icon={EmailIconFilled}
          containerStyles={{ marginBottom: 14 }}
        />

        <Input
          value={viewController.password}
          onChangeText={viewController.onUpdatePassword}
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
            onPress={viewController.onLogIn}
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
