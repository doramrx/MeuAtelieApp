import { OrderCardProps } from ".";
import { useAppContext } from "../../../hooks/useAppContext";

interface ViewControllerData {
  onOpenModal: () => void;
}

export function useViewController({
  onOrderClick,
  order,
}: OrderCardProps): ViewControllerData {
  const { openModal } = useAppContext();

  function onOpenModal() {
    onOrderClick(order.id, order.type, order.finished || false);
    openModal("AgendaOrderOptions");
  }

  return {
    onOpenModal,
  };
}
