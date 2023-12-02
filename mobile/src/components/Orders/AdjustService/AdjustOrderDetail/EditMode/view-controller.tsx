import { useCallback, useRef, useState } from "react";
import { AdjustCheckBox, AdjustOrderItem } from "../../../../../entities/Order";
import { useDatePicker } from "../../../../../utils/useDatePicker";
import { useAdjustOrderItemViewModel } from "../../../../../view-models/useAdjustOrderItemViewModel";
import { useOrderContext } from "../../../../../hooks/useOrderContext";
import { useAppContext } from "../../../../../hooks/useAppContext";
import { useFocusEffect } from "@react-navigation/native";
import { useAdjustOrderViewModel } from "../../../../../view-models/useAdjustOrderViewModel";
import { Alert } from "react-native";

interface ViewControllerData {
  dueDate: Date;
  orderItems: AdjustOrderItem[];
  isModalOpen: boolean;
  onGetAdjusts(): AdjustCheckBox[];
  onUpdateItemTitle: (orderItemIndex: number, title: string) => void;
  onUpdateItemDescription: (
    orderItemIndex: number,
    description: string
  ) => void;
  onUpdateItemAdjust: (itemIndex: number, adjustIndex: number) => void;
  onUpdateSelectedItem: (index: number) => void;
  onOpenDateTimePicker: () => void;
  onSave: () => void;
  onChangeMode: () => void;
  onUpdateOrderItemAdjusts: (adjusts: AdjustCheckBox[]) => void;
}

interface ViewControllerArgs {
  orderId: number;
  orderItemsData: AdjustOrderItem[];
  orderDueDate: Date;
  onTriggerFetchOrderData: () => Promise<void>;
}

export function useViewController({
  orderId,
  orderDueDate,
  orderItemsData,
  onTriggerFetchOrderData,
}: ViewControllerArgs): ViewControllerData {
  const selectedItemRef = useRef<number>(0);

  const [dueDate, setDueDate] = useState<Date>(orderDueDate);

  const { changeMode } = useOrderContext();
  const { isModalOpen } = useAppContext();
  const adjustOrderItemViewModel = useAdjustOrderItemViewModel();
  const adjustOrderViewModel = useAdjustOrderViewModel({
    orderId,
    shouldFetchData: false,
  });

  const { openDateTimePicker } = useDatePicker({
    someDate: dueDate,
    setDate: setDueDate,
  });

  function onUpdateSelectedItem(index: number) {
    selectedItemRef.current = index;
  }

  async function onSave() {
    try {
      await adjustOrderViewModel.updateAdjustOrder(
        dueDate,
        adjustOrderItemViewModel.items,
        orderId
      );

      await onTriggerFetchOrderData();
      changeMode();
    } catch (reason) {
      if (typeof reason === "string") {
        Alert.alert("Erro", reason);
        return;
      }

      Alert.alert("Erro", "Não foi possível atualizar os dados do pedido");
    }
  }

  function onUpdateOrderItemAdjusts(adjusts: AdjustCheckBox[]) {
    adjustOrderItemViewModel.updateOrderItemAdjusts(
      selectedItemRef.current,
      adjusts
    );
  }

  function onGetAdjusts(): AdjustCheckBox[] {
    return adjustOrderItemViewModel.items[selectedItemRef.current].adjusts;
  }

  useFocusEffect(
    useCallback(() => {
      adjustOrderItemViewModel.setAdjustOrderItems(orderItemsData);
    }, [])
  );

  return {
    dueDate,
    orderItems: adjustOrderItemViewModel.items,
    isModalOpen,
    onGetAdjusts,
    onUpdateItemTitle: adjustOrderItemViewModel.updateItemTitle,
    onUpdateItemDescription: adjustOrderItemViewModel.updateItemDescription,
    onUpdateItemAdjust: adjustOrderItemViewModel.updateItemAdjust,
    onUpdateSelectedItem,
    onOpenDateTimePicker: openDateTimePicker,
    onSave,
    onChangeMode: changeMode,
    onUpdateOrderItemAdjusts,
  };
}
