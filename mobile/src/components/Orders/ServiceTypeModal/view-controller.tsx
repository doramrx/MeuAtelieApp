import { useNavigation } from "@react-navigation/native";

import { OrderType } from "../../../entities/Order";
import { ModalTypeVariations } from "../../../contexts/AppContext";
import { useAppContext } from "../../../hooks/useAppContext";

interface ViewControllerData {
  modalType: ModalTypeVariations | null;
  onNavigateToOrderScreen: (type: OrderType) => void;
  onCloseModal: () => void;
}

export function useViewController(): ViewControllerData {
  const navigation = useNavigation();

  const { closeModal, modalType } = useAppContext();

  function onNavigateToOrderScreen(type: OrderType) {
    closeModal();
    navigation.navigate(type);
  }

  return {
    modalType,
    onNavigateToOrderScreen,
    onCloseModal: closeModal,
  };
}
