import { Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";

import XIcon from "../../../../assets/icons/x-icon.svg";

import { Screen } from "../../../../components/shared/Screen";
import { CustomerSelectionScreenContent } from "../../../../components/shared/Services/CustomerSelectionScreenContent";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { CreateTailoredClothOrderScreenContent } from "../../../../components/Orders/TailoredClothService/CreateTailoredClothOrderScreenContent";
import { StepButton } from "../../../../components/shared/Services/StepButton";

export type ServiceSteps = "customer" | "details";

export function TailoredClothService() {
  const navigation = useNavigation();

  const { currentStep } = useOrderContext();

  function abortNewService() {
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

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Novo serviço</Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={abortNewService}
        >
          <XIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        {currentStep === 1 ? (
          <CustomerSelectionScreenContent title="Roupa sob medida" />
        ) : (
          <CreateTailoredClothOrderScreenContent />
        )}
      </Screen.Content>

      <StepButton />
    </Screen.Root>
  );
}
