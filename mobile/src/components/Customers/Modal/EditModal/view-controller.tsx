import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useCustomerViewModel } from "../../../../view-models/useCustomerViewModel";
import { useAppContext } from "../../../../hooks/useAppContext";

interface Props {
  customerId: number;
  callback: (customerId: number) => void;
}

interface ViewControllerData {
  customerName: string;
  customerPhone: string;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onCloseModal: () => void;
  onEdit: () => void;
}

export function useViewController({
  customerId,
  callback,
}: Props): ViewControllerData {
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

  async function onEdit() {
    try {
      await viewModel.updateCustomer(customerId, customerName, customerPhone);
      Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
      callback(customerId);
      closeModal();
    } catch {
      Alert.alert(
        "Erro na edição",
        "Não foi possível editar os dados do cliente! Tente novamente."
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      viewModel
        .getCustomerById(customerId)
        .then((customer) => {
          setCustomerName(customer.name);
          setCustomerPhone(customer.phone);
          console.log("Dados do cliente atualizados");
        })
        .catch(() => {
          Alert.alert("Erro", "Não foi possível obter os dados do cliente");
        });
    }, [])
  );

  return {
    customerName,
    customerPhone,
    onCustomerNameChange,
    onCustomerPhoneChange,
    onCloseModal: closeModal,
    onEdit,
  };
}
