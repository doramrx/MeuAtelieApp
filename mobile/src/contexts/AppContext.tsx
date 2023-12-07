import { ReactNode, createContext, useState } from "react";

interface ContextData {
  openModal: (type: ModalTypeVariations) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalType: ModalTypeVariations | null;

  openBottomModal: (type: ModalTypeVariations) => void;
  closeBottomModal: () => void;
  isBottomModalOpen: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

export type ModalTypeVariations =
  | "Create"
  | "CustomerCreate"
  | "Detail"
  | "CustomerDetail"
  | "ProfileDetail"
  | "Edit"
  | "CustomerEdit"
  | "ProfileEdit"
  | "Update"
  | "EditPassword"
  | "ServiceSelection"
  | "MeasureList"
  | "AgendaOrderOptions"
  | "ModelPhotoView"
  | "ImageSourceSelection"
  | "CustomerActions";

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

  function openBottomModal(type: ModalTypeVariations) {
    setModalType(type);
    setIsBottomModalVisible(true);
  }

  function closeBottomModal() {
    setModalType(null);
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
