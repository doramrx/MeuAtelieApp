/* eslint-disable indent */
import { useNavigation } from "@react-navigation/native";
import { useOrderContext } from "../../hooks/useOrderContext";
import { OrderMode } from "../../contexts/OrderContext";
import { useAdjustOrderViewModel } from "../../view-models/useAdjustOrderViewModel";
import { AdjustOrder, AdjustOrderItem } from "../../entities/Order";
import { useOrderViewModel } from "../../view-models/useOrderViewModel";
import { Alert, Linking } from "react-native";
import { useAdjustOrderItemViewModel } from "../../view-models/useAdjustOrderItemViewModel";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";
import { useDatePicker } from "../../utils/useDatePicker";

export interface AdjustOrderDetailData {
  mode: OrderMode | null;
  adjustOrder: AdjustOrder;
  adjustOrderItems: AdjustOrderItem[];
  isModalOpen: boolean;
  onGoBack: () => void;
  onFinishOrder: () => void;
  onChangeMode: () => void;
  onOpenDatePicker: () => void;
  onUpdateItemTitle: (orderItemIndex: number, title: string) => void;
  onUpdateItemDescription: (
    orderItemIndex: number,
    description: string
  ) => void;
  onUpdateItemAdjust: (itemIndex: number, adjustIndex: number) => void;
}

interface ControllerArgs {
  orderId: number;
}

export function useAdjustOrderDetailViewController({
  orderId,
}: ControllerArgs): AdjustOrderDetailData {
  const navigation = useNavigation();

  const { mode, changeMode } = useOrderContext();
  const { isModalOpen } = useAppContext();

  const adjustOrderViewModel = useAdjustOrderViewModel({ orderId });
  const adjustOrderItemViewModel = useAdjustOrderItemViewModel({
    adjustOrderItems: adjustOrderViewModel.adjustOrder?.orderItems || [],
  });
  const orderViewModel = useOrderViewModel({ shouldFetchData: false });

  const [dueDate, setDueDate] = useState(new Date());
  const { openDatePicker } = useDatePicker({
    someDate: dueDate,
    setDate: setDueDate,
  });

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
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar o pedido!");
    }
  }

  async function sendWhatsappMessage() {
    if (!adjustOrderViewModel.adjustOrder) {
      return;
    }

    const message = `
      Olá, ${adjustOrderViewModel.adjustOrder.customer.name}!
      Seu pedido de ajuste no valor de R$ ${
        adjustOrderViewModel.adjustOrder.cost
      } foi finalizado. \n\nItens solicitados:\n${adjustOrderViewModel.adjustOrder.orderItems
      .map((item) => {
        return `\n\t${item.title}: ${item.adjusts
          .map((adjust) => {
            return `\n\t\t${adjust.description} - R$ ${adjust.cost
              .toFixed(2)
              .replace(".", ",")}`;
          })
          .join("")}\n`;
      })
      .join("")}\nVenha buscar o seu pedido no SatherAteliê! 😊
    `;
    try {
      await Linking.openURL(
        `whatsapp://send?text=${message}&phone=47984156092`
      );
    } catch (reason) {
      console.log(reason);
      Alert.alert(
        "Erro",
        "Não foi possível enviar a mensagem para o whatsapp do cliente!"
      );
    } finally {
      navigation.navigate("orders");
    }
  }

  return {
    mode,
    adjustOrder: adjustOrderViewModel.adjustOrder as AdjustOrder,
    adjustOrderItems: adjustOrderItemViewModel.items,
    isModalOpen,
    onGoBack: navigation.goBack,
    onFinishOrder,
    onChangeMode: changeMode,
    onOpenDatePicker: openDatePicker,
    onUpdateItemTitle: adjustOrderItemViewModel.updateItemTitle,
    onUpdateItemDescription: adjustOrderItemViewModel.updateItemDescription,
    onUpdateItemAdjust: adjustOrderItemViewModel.updateItemAdjust,
  };
}
