import { Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";

import XIcon from "../../../../assets/icons/x-icon.svg";

import {
  CreateTailoredOrderData,
  useCreateOrderController,
} from "../../../../view-controllers/Order/useCreateOrderViewController";

import { Screen } from "../../../../components/shared/Screen";
import { StepButton } from "../../../../components/shared/Services/StepButton";
import { CustomerSelection } from "../../../../components/shared/Services/CustomerSelection";
import { AdjustOrderForm } from "../../../../components/Orders/AdjustService/Form";

interface Props {
  controller?: () => CreateTailoredOrderData;
}

export function AdjustOrder({ controller }: Props) {
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
          <CustomerSelection title="Ajuste de peça" />
        ) : (
          <AdjustOrderForm />
        )}
      </Screen.Content>

      <StepButton />
    </Screen.Root>
  );
}
