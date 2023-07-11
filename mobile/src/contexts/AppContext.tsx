import { ReactNode, createContext, useState } from "react";

interface ContextData {
  openModal: (type: ModalTypeVariations) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalType: ModalTypeVariations | null;
}

interface ProviderProps {
  children: ReactNode;
}

type ModalTypeVariations = "Detail" | "Edit" | "Update" | "EditPassword";

export const AppContext = createContext({} as ContextData);

export function AppContextProvider({ children }: ProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalTypeVariations | null>(null);

  function openModal(type: ModalTypeVariations) {
    setModalType(type);
    setIsModalVisible(true);
  }

  function closeModal() {
    setModalType(null);
    setIsModalVisible(false);
  }

  return (
    <AppContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen: isModalVisible,
        modalType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
