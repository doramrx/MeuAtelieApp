import { useState } from "react";

import { Customer } from "../entities/Customer";
import { useAppContext } from "../hooks/useAppContext";
import { Alert } from "react-native";
import { useCustomerViewModel } from "../view-models/useCustomerViewModel";

export interface CustomerViewControllerData {
  customerId: number;
  customers: Customer[];
  isBottomModalOpen: boolean;
  isModalOpen: boolean;
  onOpenDetailModal: () => void;
  onOpenEditModal: () => void;
  onOpenCreateModal: () => void;
  onDeleteCustomer: () => void;
  onCloseBottomModal: () => void;
  onOpenBottomModal: (customerId: number) => void;
  onNextPage: () => void;
  onListUpdate: (customerId: number) => void;
}

export function useCustomerViewController(): CustomerViewControllerData {
  const viewModel = useCustomerViewModel();
  const {
    openModal,
    closeBottomModal,
    openBottomModal,
    modalType,
    isBottomModalOpen,
    isModalOpen,
  } = useAppContext();

  const [customerId, setCustomerId] = useState<number>(-1);

  function onOpenDetailModal() {
    openModal("Detail");
  }

  function onOpenEditModal() {
    openModal("Edit");
  }

  function onOpenCreateModal() {
    openModal("Create");
  }

  function onOpenBottomModal(customerId: number) {
    setCustomerId(customerId);
    openBottomModal();
  }

  async function deleteCustomer() {
    console.log("[ViewController] Deleting customer...");
    try {
      if (customerId === -1) {
        return Alert.alert(
          "Aviso",
          "Selecione um cliente para efetuar a exclusão!"
        );
      }

      await viewModel.deleteCustomer(customerId);
      Alert.alert("Sucesso", "Cliente excluído com sucesso!");
      closeBottomModal();
    } catch {
      Alert.alert(
        "Erro na exclusão",
        "Não foi possível excluir o cliente selecionado! Tente novamente"
      );
    }
  }

  function onDeleteCustomer() {
    Alert.alert("Confirmação", "Deseja realmente deletar este cliente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: async () => await deleteCustomer(),
      },
    ]);
  }

  async function onListUpdate(customerId: number) {
    try {
      const customer = await viewModel.getCustomerById(customerId);

      if (modalType === "Create") {
        // Um novo cliente foi cadastrado
        // baixar os dados dele e inserir na lista!
        viewModel.addCustomerIntoList(customer);
      } else {
        // O cliente foi atualizado
        // baixar os dados do cliente e atualizar na lista!
        viewModel.updateCustomerFromList(customer);
      }
    } catch {
      Alert.alert(
        "Aviso",
        "Não foi possível atualizar a lista de clientes com a última operação realizada!"
      );
    }
  }

  return {
    customerId,
    customers: viewModel.customers,
    isBottomModalOpen,
    isModalOpen,
    onOpenDetailModal,
    onOpenEditModal,
    onOpenCreateModal,
    onDeleteCustomer,
    onCloseBottomModal: closeBottomModal,
    onOpenBottomModal,
    onNextPage: viewModel.nextPage,
    onListUpdate,
  };
}
