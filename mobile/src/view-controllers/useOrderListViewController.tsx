import { Order } from "../entities/Order";
import { useAppContext } from "../hooks/useAppContext";
import { useOrderViewModel } from "../view-models/useOrderViewModel";

export interface OrderListViewControllerData {
  orders: Order[];
  isModalOpen: boolean;
  onOpenServiceSelectionModal: () => void;
}

export function useOrderListViewController(): OrderListViewControllerData {
  const { openModal, isModalOpen } = useAppContext();

  const viewModel = useOrderViewModel();

  function onOpenServiceSelectionModal() {
    openModal("ServiceSelection");
  }

  return {
    orders: viewModel.orders,
    isModalOpen,
    onOpenServiceSelectionModal,
  };
}
