import { Customer } from "../../entities/Customer";
import { useAppContext } from "../../hooks/useAppContext";
import { useCustomerViewModel } from "../../view-models/useCustomerViewModel";

export interface CustomerSelectionData {
  customers: Customer[];
  isModalOpen: boolean;
  onOpenCreateModal: () => void;
  onMoveNextPage: () => void;
}

export function useCustomerSelectionViewController(): CustomerSelectionData {
  const viewModel = useCustomerViewModel({ shouldFetch: true });
  const { isModalOpen, openModal } = useAppContext();

  function onOpenCreateModal() {
    openModal("Create");
  }

  return {
    customers: viewModel.customers,
    isModalOpen,
    onOpenCreateModal,
    onMoveNextPage: viewModel.nextPage,
  };
}
