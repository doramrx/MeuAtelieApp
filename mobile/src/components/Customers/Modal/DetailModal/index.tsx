import { Text, View } from "react-native";

import { THEME } from "../../../../theme";
import { styles } from "./styles";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import DetailModalIcon from "../../../../assets/icons/detail-icon-with-baloon-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { useViewController } from "./view-controller";

interface Props {
  customerId: number;
}

export function DetailModal({ customerId }: Props) {
  const viewController = useViewController({ customerId });

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.BLUE}
        icon={DetailModalIcon}
      />

      <ModalTemplate.Container title="Detalhes">
        <ModalTemplate.Content>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.label}>Telefone:</Text>
            </View>
            <View>
              <Text style={styles.text}>{viewController.customerName}</Text>
              <Text style={styles.text}>{viewController.customerPhone}</Text>
            </View>
          </View>
        </ModalTemplate.Content>
        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Fechar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={viewController.onCloseModal}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
