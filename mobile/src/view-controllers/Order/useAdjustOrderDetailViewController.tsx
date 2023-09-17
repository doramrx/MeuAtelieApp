import { useCallback, useRef, useState } from "react";
import { Alert, Linking } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
/* eslint-disable indent */
import {
  AdjustCheckBox,
  AdjustOrder,
  AdjustOrderItem,
} from "../../entities/Order";

import { useOrderContext } from "../../hooks/useOrderContext";
import { useAppContext } from "../../hooks/useAppContext";

import { OrderMode } from "../../contexts/OrderContext";

import { useDatePicker } from "../../utils/useDatePicker";

import { useAdjustOrderViewModel } from "../../view-models/useAdjustOrderViewModel";
import { useOrderViewModel } from "../../view-models/useOrderViewModel";
import { useAdjustOrderItemViewModel } from "../../view-models/useAdjustOrderItemViewModel";

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
  onUpdateSelectedItem: (index: number) => void;
  onGetAdjusts: () => AdjustCheckBox[];
  onUpdateOrderItemAdjusts: (adjusts: AdjustCheckBox[]) => void;
  onSaveModifications: () => void;
}

interface ControllerArgs {
  orderId: number;
}

export function useAdjustOrderDetailViewController({
  orderId,
}: ControllerArgs): AdjustOrderDetailData {
  const navigation = useNavigation();
  const selectedItemRef = useRef<number>(0);
  const wasFormUpdated = useRef<boolean>(false);

  const { mode, changeMode } = useOrderContext();
  const { isModalOpen } = useAppContext();

  const adjustOrderViewModel = useAdjustOrderViewModel({
    orderId,
    shouldFetchData: true,
  });
  const adjustOrderItemViewModel = useAdjustOrderItemViewModel();
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

  function onUpdateSelectedItem(index: number) {
    selectedItemRef.current = index;
  }

  function onGetAdjusts(): AdjustCheckBox[] {
    return adjustOrderViewModel.adjustOrder?.orderItems[selectedItemRef.current]
      .adjusts as AdjustCheckBox[];
  }

  function onUpdateOrderItemAdjusts(adjusts: AdjustCheckBox[]) {
    adjustOrderItemViewModel.updateOrderItemAdjusts(
      selectedItemRef.current,
      adjusts
    );
  }

  function onSaveModifications() {
    // Todo
  }

  function onChangeMode() {
    if (wasFormUpdated.current) {
      console.log(
        "[ViewController] Form was changed by user! Updating the form data..."
      );
      adjustOrderItemViewModel.setAdjustOrderItems(
        adjustOrderViewModel.adjustOrder?.orderItems as AdjustOrderItem[]
      );
      wasFormUpdated.current = false;
    }
    console.log("[ViewController] Changing the mode...");

    changeMode();
  }

  function onUpdateItemTitle(orderItemIndex: number, title: string) {
    adjustOrderItemViewModel.updateItemTitle(orderItemIndex, title);

    console.log(adjustOrderItemViewModel.items[orderItemIndex].title);
    console.log(
      adjustOrderViewModel.adjustOrder?.orderItems[orderItemIndex].title
    );

    if (!wasFormUpdated.current) {
      wasFormUpdated.current = true;
    }
  }

  function onUpdateItemDescription(
    orderItemIndex: number,
    description: string
  ) {
    adjustOrderItemViewModel.updateItemDescription;
    if (!wasFormUpdated.current) {
      wasFormUpdated.current = true;
    }
  }

  function onUpdateItemAdjust(itemIndex: number, adjustIndex: number) {
    adjustOrderItemViewModel.updateItemAdjust(itemIndex, adjustIndex);
    if (!wasFormUpdated.current) {
      wasFormUpdated.current = true;
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (adjustOrderViewModel.adjustOrder) {
        adjustOrderItemViewModel.setAdjustOrderItems([
          ...adjustOrderViewModel.adjustOrder.orderItems,
        ]);
      }
    }, [adjustOrderViewModel.adjustOrder?.orderItems])
  );

  return {
    mode,
    adjustOrder: adjustOrderViewModel.adjustOrder as AdjustOrder,
    adjustOrderItems: adjustOrderItemViewModel.items,
    isModalOpen,
    onGoBack: navigation.goBack,
    onFinishOrder,
    onChangeMode,
    onOpenDatePicker: openDatePicker,
    onUpdateItemTitle,
    onUpdateItemDescription,
    onUpdateItemAdjust,
    onUpdateSelectedItem,
    onGetAdjusts,
    onUpdateOrderItemAdjusts,
    onSaveModifications,
  };
}
