import { useState } from "react";
import { Alert } from "react-native";

import { Customer } from "../../entities/Customer";
import { useCustomerViewModel } from "../../view-models/useCustomerViewModel";
import { useAppContext } from "../../hooks/useAppContext";
import { ModalTypeVariations } from "../../contexts/AppContext";

export interface CustomerViewControllerData {
  customerId: number;
  customers: Customer[];
  isBottomModalOpen: boolean;
  isModalOpen: boolean;
  modalType: ModalTypeVariations | null;
  onOpenDetailModal: () => void;
  onOpenEditModal: () => void;
  onOpenCreateModal: () => void;
  onDeleteCustomer: () => void;
  onCloseBottomModal: () => void;
  onOpenBottomModal: (customerId: number) => void;
  onNextPage: () => void;
  onListUpdate: (customerId: number) => void;
}

export function useViewController(): CustomerViewControllerData {
  const viewModel = useCustomerViewModel({ shouldFetch: true });
  const {
    openModal,
    closeBottomModal,
    closeModal,
    openBottomModal,
    modalType,
    isBottomModalOpen,
    isModalOpen,
  } = useAppContext();

  const [customerId, setCustomerId] = useState<number>(-1);

  function onOpenDetailModal() {
    if (isBottomModalOpen) {
      closeBottomModal();
    }

    if (isModalOpen) {
      closeModal();
    }
    openModal("CustomerDetail");
  }

  function onOpenEditModal() {
    if (isBottomModalOpen) {
      closeBottomModal();
    }

    if (isModalOpen) {
      closeModal();
    }
    openModal("CustomerEdit");
  }

  function onOpenCreateModal() {
    if (isModalOpen) {
      closeModal();
    }
    openModal("CustomerCreate");
  }

  function onOpenBottomModal(customerId: number) {
    setCustomerId(customerId);
    openBottomModal("CustomerActions");
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

      if (modalType === "CustomerCreate") {
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
    modalType,
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
