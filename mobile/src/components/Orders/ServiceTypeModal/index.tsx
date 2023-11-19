import { Text, TouchableHighlight } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import { styles as modalStyles } from "../../shared/ModalTemplate/styles";

import SewingMachineIcon from "../../../assets/icons/sewing-machine-icon.svg";

import { ModalTemplate } from "../../shared/ModalTemplate";
import { useViewController } from "./view-controller";

export function ServiceTypeModal() {
  const viewController = useViewController();

  return viewController.modalType === "ServiceSelection" ? (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        icon={SewingMachineIcon}
        backgroundColor={THEME.COLORS.PINK.V2}
      />
      <ModalTemplate.Container title="Selecione o tipo de serviço">
        <ModalTemplate.Content>
          <TouchableHighlight
            activeOpacity={0.98}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => {
              viewController.onNavigateToOrderScreen("adjustService");
            }}
          >
            <Text style={styles.text}>Ajuste/conserto de peça</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.98}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            style={styles.button}
            onPress={() => {
              viewController.onNavigateToOrderScreen("tailoredClothService");
            }}
          >
            <Text style={styles.text}>Roupa sob medida</Text>
          </TouchableHighlight>
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
  ) : null;
}
