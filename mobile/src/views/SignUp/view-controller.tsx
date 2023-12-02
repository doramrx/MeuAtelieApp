import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import { useDressmakerViewModel } from "../../view-models/useDressmakerViewModel";

export interface SignUpViewControllerData {
  dressmakerName: string;
  email: string;
  password: string;
  confirmationPassword: string;
  onUpdateDressmakerName: (name: string) => void;
  onUpdateEmail: (email: string) => void;
  onUpdatePassword: (password: string) => void;
  onUpdateConfirmationPassword: (password: string) => void;
  onSignUp: () => void;
}

export function useViewController(): SignUpViewControllerData {
  const navigation = useNavigation();

  const viewModel = useDressmakerViewModel();

  const [dressmakerName, setDressmakerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  function onUpdateDressmakerName(name: string) {
    setDressmakerName(name);
  }

  function onUpdateEmail(email: string) {
    setEmail(email);
  }

  function onUpdatePassword(password: string) {
    setPassword(password);
  }

  function onUpdateConfirmationPassword(password: string) {
    setConfirmationPassword(password);
  }

  async function onSignUp() {
    if (
      !dressmakerName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmationPassword.trim()
    ) {
      return Alert.alert(
        "Falha ao realizar o cadastro!",
        "Existem campos que não foram preenchidos."
      );
    }

    if (password.trim() !== confirmationPassword.trim()) {
      return Alert.alert(
        "Falha ao realizar o cadastro!",
        "Senhas não coincidem!"
      );
    }

    try {
      await viewModel.createDressmaker(dressmakerName, email, password);

      Alert.alert(
        "Cadastro realizado com sucesso!",
        "Usuário cadastrado com sucesso!"
      );
      navigation.navigate("signIn");
    } catch (reason) {
      if (typeof reason === "string") {
        Alert.alert("Falha ao realizar o cadastro", reason as string);
      } else {
        Alert.alert(
          "Falha ao realizar o cadastro",
          "Não foi possível realizar o cadastro da costureira, tente novamente."
        );
      }
    }
  }

  return {
    dressmakerName,
    email,
    password,
    confirmationPassword,
    onUpdateDressmakerName,
    onUpdateEmail,
    onUpdatePassword,
    onUpdateConfirmationPassword,
    onSignUp,
  };
}
