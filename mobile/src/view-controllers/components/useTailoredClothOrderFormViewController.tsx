import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomerMeasure } from "../../entities/Order";

import { useOrderContext } from "../../hooks/useOrderContext";

import { useDatePicker } from "../../utils/useDatePicker";

import { useMeasureViewModel } from "../../view-models/useMeasureViewModel";
import { useCustomerMeasureViewModel } from "../../view-models/useCustomerMeasureViewModel";
import { useTailoredClothOrderViewModel } from "../../view-models/useTailoredClothOrderViewModel";

export interface TailoredClothOrderFormData {
  title: string;
  description: string;
  measures: CustomerMeasure[];
  cost: string;
  dueDate: Date;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onUpdateCost: (cost: string) => void;
  onOpenDatePicker: () => void;
  onUpdateCustomerMeasure: (measureId: number, value: number) => void;
  onCreateOrder: () => void;
}

export function useTailoredClothOrderFormViewController(): TailoredClothOrderFormData {
  const navigation = useNavigation();
  const { selectedCustomerId } = useOrderContext();

  const measureViewModel = useMeasureViewModel();
  const customerMeasureViewModel = useCustomerMeasureViewModel({
    measures: measureViewModel.measures,
  });
  const tailoredClothOrderViewModel = useTailoredClothOrderViewModel({
    shouldFetchData: false,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const { openDatePicker } = useDatePicker({
    someDate: dueDate,
    setDate: setDueDate,
  });

  function onUpdateTitle(title: string) {
    setTitle(title);
  }

  function onUpdateDescription(description: string) {
    setDescription(description);
  }

  function onUpdateCost(cost: string) {
    setCost(cost);
  }

  async function onCreateOrder() {
    if (!selectedCustomerId) {
      return Alert.alert("Erro", "Nenhum cliente foi selecionado!");
    }

    try {
      await tailoredClothOrderViewModel.createNewOrder({
        clothTitle: title,
        clothDescription: description,
        cost: Number(cost.replace(",", ".")),
        dueDate,
        createdAt: new Date(),
        customerId: selectedCustomerId,
        customerMeasures: customerMeasureViewModel.customerMeasures,
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
    title,
    description,
    measures: customerMeasureViewModel.customerMeasures,
    cost,
    dueDate,
    onUpdateTitle,
    onUpdateDescription,
    onUpdateCost,
    onOpenDatePicker: openDatePicker,
    onUpdateCustomerMeasure: customerMeasureViewModel.updateCustomerMeasure,
    onCreateOrder,
  };
}
