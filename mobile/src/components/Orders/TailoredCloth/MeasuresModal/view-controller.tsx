import { ModalTypeVariations } from "../../../../contexts/AppContext";
import { useAppContext } from "../../../../hooks/useAppContext";

interface ViewControllerData {
  modalType: ModalTypeVariations | null;
  onCloseModal: () => void;
}

export function useViewController(): ViewControllerData {
  const { closeModal, modalType } = useAppContext();

  return {
    modalType,
    onCloseModal: closeModal,
  };
}
