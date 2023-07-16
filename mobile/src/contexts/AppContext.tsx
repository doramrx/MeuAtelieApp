import { ReactNode, createContext, useState } from "react";

interface ContextData {
  openModal: (type: ModalTypeVariations) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalType: ModalTypeVariations | null;

  openBottomModal: () => void;
  closeBottomModal: () => void;
  isBottomModalOpen: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

type ModalTypeVariations =
  | "Create"
  | "Detail"
  | "Edit"
  | "Update"
  | "EditPassword"
  | "ServiceSelection";

export const AppContext = createContext({} as ContextData);

export function AppContextProvider({ children }: ProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalTypeVariations | null>(null);

  function openModal(type: ModalTypeVariations) {
    setModalType(type);
    setIsModalVisible(true);
  }

  function closeModal() {
    setModalType(null);
    setIsModalVisible(false);
  }

  function openBottomModal() {
    setIsBottomModalVisible(true);
  }

  function closeBottomModal() {
    setIsBottomModalVisible(false);
  }

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen: isModalVisible,
        modalType,
        openBottomModal,
        closeBottomModal,
        isBottomModalOpen: isBottomModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
