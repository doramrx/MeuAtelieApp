import { Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import { styles as modalStyles } from "../../shared/ModalTemplate/styles";

import SewingMachineIcon from "../../../assets/icons/sewing-machine-icon.svg";

import { ModalTemplate } from "../../shared/ModalTemplate";
import { useAppContext } from "../../../hooks/useAppContext";
import { ServiceType } from "../../../screens/Order/OrderList";

export function ServiceTypeModal() {
  const navigation = useNavigation();

  const { closeModal, modalType } = useAppContext();

  function navigateToService(service: ServiceType) {
    closeModal();
    navigation.navigate(service);
  }

  return modalType === "ServiceSelection" ? (
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
              navigateToService("adjustService");
            }}
          >
            <Text style={styles.text}>Ajuste/conserto de peça</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.98}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            style={styles.button}
            onPress={() => {
              navigateToService("tailoredClothService");
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
            onPress={closeModal}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  ) : null;
}
