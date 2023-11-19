import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useAppContext } from "../../../../hooks/useAppContext";
import { useCustomerViewModel } from "../../../../view-models/useCustomerViewModel";

interface Props {
  customerId: number;
}

interface ViewControllerData {
  customerName: string;
  customerPhone: string;
  onCloseModal: () => void;
}

export function useViewController({ customerId }: Props): ViewControllerData {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const viewModel = useCustomerViewModel();
  const { closeModal } = useAppContext();

  useFocusEffect(
    useCallback(() => {
      viewModel
        .getCustomerById(customerId)
        .then((customer) => {
          setCustomerName(customer.name);
          setCustomerPhone(customer.phone);
        })
        .catch(() => {
          Alert.alert("Erro", "Não foi possível obter os dados do cliente");
        });
    }, [])
  );

  return {
    customerName,
    customerPhone,
    onCloseModal: closeModal,
  };
}
