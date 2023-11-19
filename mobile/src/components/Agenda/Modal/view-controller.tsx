import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { OrderType } from "../../../entities/Order";
import { ModalTypeVariations } from "../../../contexts/AppContext";
import { useAppContext } from "../../../hooks/useAppContext";

import { useOrderViewModel } from "../../../view-models/useOrderViewModel";
import {
  AdjustOrderData,
  useAdjustOrderViewModel,
} from "../../../view-models/useAdjustOrderViewModel";
import {
  TailoredClothOrderData,
  useTailoredClothOrderViewModel,
} from "../../../view-models/useTailoredClothOrderViewModel";

import { useWhatsappNotification } from "../../../utils/useWhatsappNotification";

export interface AgendaModalData {
  modalType: ModalTypeVariations | null;
  onNavigateToOrderDetails: () => void;
  onFinishOrder: () => void;
  onCloseModal: () => void;
}

interface Args {
  orderId: number;
  orderType: OrderType;
  callback: () => void;
}

export function useViewController({
  orderId,
  orderType,
  callback,
}: Args): AgendaModalData {
  const navigation = useNavigation();

  const { closeModal, modalType } = useAppContext();

  const orderViewModel = useOrderViewModel({ shouldFetchData: false });
  const specializedOrderViewModel =
    orderType === "adjustService"
      ? useAdjustOrderViewModel({ orderId, shouldFetchData: false })
      : useTailoredClothOrderViewModel({ orderId, shouldFetchData: false });
  const { sendMessage } = useWhatsappNotification();

  function onNavigateToOrderDetails() {
    closeModal();
    navigation.navigate("orderDetail", {
      orderId,
      orderType,
    });
  }

  async function onFinishOrder() {
    try {
      await orderViewModel.finishOrder(orderId);

      Alert.alert(
        "Sucesso",
        "Pedido finalizado com sucesso!\nDeseja enviar uma mensagem de notificação para o whatsapp do cliente?",
        [
          { text: "Sim", onPress: sendWhatsappMessage },
          { text: "Cancelar", style: "cancel" },
        ]
      );
      callback();
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar o pedido!");
    } finally {
      closeModal();
    }
  }

  async function sendWhatsappMessage() {
    try {
      let orderData;

      if (orderType === "adjustService") {
        const _viewModel = specializedOrderViewModel as AdjustOrderData;
        orderData = await _viewModel.getAdjustOrder();
      } else {
        const _viewModel = specializedOrderViewModel as TailoredClothOrderData;
        orderData = await _viewModel.getTailoredClothOrder();
      }

      if (!orderData) {
        return Promise.reject();
      }

      await sendMessage({ order: orderData, orderType });
    } catch (reason) {
      Alert.alert(
        "Erro",
        "Não foi possível enviar a mensagem para o whatsapp do cliente!"
      );
    } finally {
      closeModal();
    }
  }

  return {
    modalType,
    onNavigateToOrderDetails,
    onFinishOrder,
    onCloseModal: closeModal,
  };
}
