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
  const [customerName, setCustomerName] = useState("a");
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
          console.log("Dados do cliente");
        })
        .catch(() => {
          Alert.alert("Erro", "Não foi possível obter os dados do cliente");
        });
    }, [customerId])
  );

  return {
    customerName,
    customerPhone,
    onCloseModal: closeModal,
  };
}
