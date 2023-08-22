import { useAppContext } from "../hooks/useAppContext";

export interface OrderListViewControllerData {
  isModalOpen: boolean;
  onOpenServiceSelectionModal: () => void;
}

export function useOrderListViewController(): OrderListViewControllerData {
  const { openModal, isModalOpen } = useAppContext();

  function onOpenServiceSelectionModal() {
    openModal("ServiceSelection");
  }

  return {
    isModalOpen,
    onOpenServiceSelectionModal
  }
}

