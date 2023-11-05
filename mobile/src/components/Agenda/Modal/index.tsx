import { Text, TouchableHighlight } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import { styles as modalStyles } from "../../../components/shared/ModalTemplate/styles";

import AgendaIcon from "../../../assets/icons/Agenda.svg";

import { ModalTemplate } from "../../shared/ModalTemplate";
import { OrderType } from "../../../entities/Order";
import { useAgendaModalViewController } from "../../../view-controllers/components/useAgendaModalViewController";

interface Props {
  orderId: number;
  orderType: OrderType;
  isOrderFinished: boolean;
  callback: () => void;
}

export function Modal({
  orderId,
  orderType,
  isOrderFinished,
  callback,
}: Props) {
  const viewController = useAgendaModalViewController({
    orderId,
    orderType,
    callback,
  });

  return viewController.modalType === "AgendaOrderOptions" ? (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.PINK.V2}
        icon={AgendaIcon}
      />
      <ModalTemplate.Container title="Pedido">
        <ModalTemplate.Content>
          <TouchableHighlight
            activeOpacity={0.98}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            style={[styles.button, { marginBottom: 10 }]}
            onPress={viewController.onNavigateToOrderDetails}
          >
            <Text style={styles.text}>Detalhes do pedido</Text>
          </TouchableHighlight>

          {!isOrderFinished && (
            <TouchableHighlight
              activeOpacity={0.98}
              underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
              style={[styles.button, { marginBottom: 10 }]}
              onPress={viewController.onFinishOrder}
            >
              <Text style={styles.text}>Finalizar pedido</Text>
            </TouchableHighlight>
          )}
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
