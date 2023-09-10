import { Text, TouchableOpacity } from "react-native";

import {
  CreateTailoredOrderData,
  useCreateOrderController,
} from "../../../../view-controllers/Order/useCreateOrderViewController";

import { styles } from "./styles";
import { THEME } from "../../../../theme";

import XIcon from "../../../../assets/icons/x-icon.svg";

import { Screen } from "../../../../components/shared/Screen";
import { CustomerSelection } from "../../../../components/shared/Services/CustomerSelection";
import { TailoredClothOrderForm } from "../../../../components/Orders/TailoredCloth/Form";
import { StepButton } from "../../../../components/shared/Services/StepButton";

interface Props {
  controller?: () => CreateTailoredOrderData;
}

export function TailoredCloth({ controller }: Props) {
  const viewController = controller ? controller() : useCreateOrderController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Novo serviço</Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={viewController.onAbort}
        >
          <XIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        {viewController.currentStep === 1 ? (
          <CustomerSelection title="Roupa sob medida" />
        ) : (
          <TailoredClothOrderForm />
        )}
      </Screen.Content>

      <StepButton />
    </Screen.Root>
  );
}
