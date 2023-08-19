import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert } from "react-native";
import { useDressmakerViewModel } from "../view-models/useDressmakerViewModel";

export interface SignInViewControllerData {
  email: string;
  password: string;
  onUpdateEmail: (email: string) => void;
  onUpdatePassword: (password: string) => void;
  onLogIn: () => void;
}

export function useSignInViewController(): SignInViewControllerData {
  const navigation = useNavigation();

  const viewModel = useDressmakerViewModel();
  const { logIn } = useAuthContext();

  const [email, setEmail] = useState("adm@adm.com");
  const [password, setPassword] = useState("adm123");

  function onUpdateEmail(email: string) {
    setEmail(email);
  }

  function onUpdatePassword(password: string) {
    setPassword(password);
  }

  async function onLogIn() {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return Alert.alert(
        "Falha na autenticação",
        "Os campos email e senha precisam ser preenchidos!"
      );
    }

    try {
      console.log("[ViewController] onLogIn");
      const dressmakerId = await viewModel.getDressmakerId(email, password);

      logIn(dressmakerId);
      Alert.alert(
        "Autenticado com sucesso",
        "Autenticação realizada com sucesso!"
      );

      navigation.navigate("tabNavigatorRoutes");
    } catch {
      Alert.alert(
        "Falha na autenticação",
        "Não foi possível realizar a autenticação!"
      );
    }
  }

  return {
    email,
    password,
    onUpdateEmail,
    onUpdatePassword,
    onLogIn,
  };
}
