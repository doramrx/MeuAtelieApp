import { useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../../hooks/useOrderContext";
import { Alert } from "react-native";

export interface CreateTailoredOrderData {
  currentStep: number;
  onAbort: () => void;
}

export function useCreateOrderController(): CreateTailoredOrderData {
  const navigation = useNavigation();
  const { currentStep } = useOrderContext();

  function onAbort() {
    Alert.alert(
      "Confirmação",
      "Deseja realmente abortar a criação do serviço?",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  return {
    currentStep,
    onAbort,
  };
}
