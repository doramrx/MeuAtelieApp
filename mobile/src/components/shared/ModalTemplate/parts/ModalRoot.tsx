import { ReactNode } from "react";
import { Modal, View } from "react-native";

import { useAppContext } from "../../../../hooks/useAppContext";

import { styles } from "../styles";

interface Props {
  children: ReactNode;
}

export function ModalRoot({ children }: Props) {
  const { isModalOpen } = useAppContext();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={isModalOpen}
    >
      <View style={styles.modalBackgroundContainer}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
}
