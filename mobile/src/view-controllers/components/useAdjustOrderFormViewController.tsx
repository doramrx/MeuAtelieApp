import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Adjust, AdjustOrderItem } from "../../entities/Order";

import { useOrderContext } from "../../hooks/useOrderContext";
import { useDatePicker } from "../../utils/useDatePicker";

import { useAdjustServiceViewModel } from "../../view-models/useAdjustServiceViewModel";
import { useAdjustOrderViewModel } from "../../view-models/useAdjustOrderViewModel";
import { useAdjustOrderItemViewModel } from "../../view-models/useAdjustOrderItemViewModel";

export interface AdjustOrderFormData {
  customerId: number | null;
  adjusts: Adjust[];
  dueDate: Date;
  itemAmount: string;
  items: AdjustOrderItem[];
  onOpenDatePicker: () => void;
  onUpdateItemAmount: (amount: string) => void;
  onUpdateItemTitle: (index: number, title: string) => void;
  onUpdateItemDescription: (index: number, description: string) => void;
  onUpdateItemAdjust: (itemIndex: number, adjustIndex: number) => void;
  onGetTotal: () => string;
  onInitItems: () => void;
  onCreateOrder: () => Promise<void>;
}

export function useAdjustOrderFormViewController(): AdjustOrderFormData {
  const { selectedCustomerId } = useOrderContext();

  const adjustServicesViewModel = useAdjustServiceViewModel();
  const adjustOrderItemViewModel = useAdjustOrderItemViewModel();
  const adjustOrderViewModel = useAdjustOrderViewModel({});

  const [itemAmount, setItemAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState(new Date());
  const navigation = useNavigation();

  const { openDatePicker } = useDatePicker({
    someDate: dueDate,
    setDate: setDueDate,
  });

  function onUpdateItemAmount(amount: string) {
    setItemAmount(amount);
  }

  function onGetTotal() {
    const total = adjustOrderItemViewModel.getTotalCost();
    return total.toFixed(2).replace(".", ",");
  }

  function onInitItems() {
    if (!Number.isNaN(itemAmount)) {
      adjustOrderItemViewModel.initItems(
        Number(itemAmount),
        adjustServicesViewModel.adjusts
      );
    }
  }

  async function onCreateOrder() {
    if (!selectedCustomerId) {
      return Alert.alert("Erro", "Nenhum cliente foi selecionado!");
    }

    try {
      await adjustOrderViewModel.createAdjustOrder({
        cost: adjustOrderItemViewModel.getTotalCost(),
        createdAt: new Date(),
        dueDate,
        customerId: selectedCustomerId,
        orderItems: adjustOrderItemViewModel.items,
      });

      Alert.alert("Sucesso", "Pedido cadastrado com sucesso!");
      navigation.navigate("orders");
    } catch (reason) {
      if (typeof reason === "string") {
        Alert.alert("Erro", reason);
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o pedido!");
      }
    }
  }

  return {
    customerId: selectedCustomerId,
    adjusts: adjustServicesViewModel.adjusts,
    dueDate,
    itemAmount,
    items: adjustOrderItemViewModel.items,
    onOpenDatePicker: openDatePicker,
    onUpdateItemAmount,
    onUpdateItemTitle: adjustOrderItemViewModel.updateItemTitle,
    onUpdateItemDescription: adjustOrderItemViewModel.updateItemDescription,
    onUpdateItemAdjust: adjustOrderItemViewModel.updateItemAdjust,
    onGetTotal,
    onInitItems,
    onCreateOrder
  };
}
