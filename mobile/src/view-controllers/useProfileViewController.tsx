import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useDressmakerViewModel } from "../view-models/useDressmakerViewModel";
import { useAppContext } from "../hooks/useAppContext";
import { useAuthContext } from "../hooks/useAuthContext";

export interface ProfileViewControllerData {
  userId: number;
  dressmakerName: string;
  isModalOpen: boolean;
  onUpdateDressmakerName: (name: string) => void;
  onOpenDetailModal: () => void;
  onOpenEditModal: () => void;
  onOpenEditPasswordModal: () => void;
  onLogOut: () => void;
  onDeleteAccount: () => void;
}

export function useProfileViewController(): ProfileViewControllerData {
  const navigation = useNavigation();

  const viewModel = useDressmakerViewModel();

  const { logOut, userId } = useAuthContext();
  const { openModal, isModalOpen } = useAppContext();

  const [dressmakerName, setDressmakerName] = useState("");

  function onUpdateDressmakerName(name: string) {
    setDressmakerName(name);
  }

  function onOpenDetailModal() {
    openModal("Detail");
  }

  function onOpenEditModal() {
    openModal("Edit");
  }

  function onOpenEditPasswordModal() {
    openModal("EditPassword");
  }

  function onLogOut() {
    logOut();
    navigation.navigate("inaugural");
  }

  async function deleteAccount() {
    const successfullyDeleted = await viewModel.deleteDressmaker(
      userId as number
    );

    if (!successfullyDeleted) {
      return Alert.alert(
        "Erro ao deletar o perfil",
        "Não foi possível deletar o perfil! Tente novamente."
      );
    }

    Alert.alert("Sucesso", "O seu perfil foi deletado com sucesso!");
    navigation.navigate("signIn");
  }

  function showDeleteConfirmationAlert() {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir a sua conta? Todos os serviços realizados também serão excluídos no processo.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          style: "default",
          onPress: async () => await deleteAccount(),
        },
      ]
    );
  }

  if (!userId) {
    logOut();
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewController] getDressmakerById");
      viewModel.getDressmakerById(userId as number).then(() => {
        setDressmakerName(
          viewModel.dressmaker ? viewModel.dressmaker.name : ""
        );
      });
    }, [viewModel.dressmaker && viewModel.dressmaker.name])
  );

  return {
    userId: userId as number,
    dressmakerName,
    onUpdateDressmakerName,
    onOpenDetailModal,
    onOpenEditModal,
    onOpenEditPasswordModal,
    onLogOut,
    isModalOpen,
    onDeleteAccount: showDeleteConfirmationAlert,
  };
}
