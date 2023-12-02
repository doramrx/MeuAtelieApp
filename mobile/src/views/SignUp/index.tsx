import { Text, View, Image, TouchableHighlight } from "react-native";
import { Link } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../theme";

import Logo from "../../assets/Logo.png";
import EmailIconFilled from "../../assets/icons/email-icon-filled.svg";
import PasswordIconFilled from "../../assets/icons/password-icon-filled.svg";
import UserIconFilled from "../../assets/icons/user-icon-filled.svg";

import { Input } from "../../components/shared/Input";
import { Screen } from "../../components/shared/Screen";

import { SignUpViewControllerData, useViewController } from "./view-controller";

interface Props {
  controller?: () => SignUpViewControllerData;
}

export function SignUp({ controller }: Props) {
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
        <Text style={styles.title}>Cadastro</Text>

        <Input
          value={viewController.dressmakerName}
          onChangeText={viewController.onUpdateDressmakerName}
          placeholder="Nome"
          icon={UserIconFilled}
          containerStyles={{ marginBottom: 14 }}
        />
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
          containerStyles={{ marginBottom: 14 }}
        />
        <Input
          value={viewController.confirmationPassword}
          onChangeText={viewController.onUpdateConfirmationPassword}
          placeholder="Confirmar senha"
          isPasswordInput={true}
          icon={PasswordIconFilled}
        />

        <View style={styles.wrapper}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            activeOpacity={0.98}
            onPress={viewController.onSignUp}
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
