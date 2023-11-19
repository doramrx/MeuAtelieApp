import { useState } from "react";

import { useAppContext } from "../../../../hooks/useAppContext";
import { useCustomerViewModel } from "../../../../view-models/useCustomerViewModel";
import { Alert } from "react-native";

interface Props {
  callback: (customerId: number) => void;
}

interface ViewControllerData {
  customerName: string;
  customerPhone: string;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onCreateCustomer: () => void;
  onCloseModal: () => void;
}

export function useViewController({ callback }: Props): ViewControllerData {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const viewModel = useCustomerViewModel();
  const { closeModal } = useAppContext();

  function onCustomerNameChange(name: string) {
    setCustomerName(name);
  }

  function onCustomerPhoneChange(phone: string) {
    setCustomerPhone(phone);
  }

  async function onCreateCustomer() {
    try {
      const customerId = await viewModel.createNewCustomer(
        customerName,
        customerPhone
      );

      Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
      callback(customerId);
      closeModal();
    } catch {
      Alert.alert(
        "Erro no cadastro",
        "Não foi possível cadastrar o cliente! Tente novamente."
      );
    }
  }

  return {
    customerName,
    customerPhone,
    onCustomerNameChange,
    onCustomerPhoneChange,
    onCreateCustomer,
    onCloseModal: closeModal,
  };
}
