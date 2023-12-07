import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

import { useDressmakerViewModel } from "../../view-models/useDressmakerViewModel";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppContext } from "../../hooks/useAppContext";
import { ModalTypeVariations } from "../../contexts/AppContext";
import { Dressmaker } from "../../entities/Dressmaker";

export interface ProfileViewControllerData {
  userId: number;
  dressmaker: Dressmaker | null;
  isModalOpen: boolean;
  modalType: ModalTypeVariations | null;
  onUpdateDressmakerName: (name: string) => void;
  onOpenDetailModal: () => void;
  onOpenEditModal: () => void;
  onOpenEditPasswordModal: () => void;
  onLogOut: () => void;
  onDeleteAccount: () => void;
  onDeleteOrderPhotosFolder: () => void;
  onUpdateDressmaker: (
    dressmakerId: number,
    name: string,
    email: string
  ) => Promise<void>;
}

export function useViewController(): ProfileViewControllerData {
  const navigation = useNavigation();

  const { logOut, userId } = useAuthContext();
  const { openModal, closeModal, isModalOpen, modalType } = useAppContext();

  const viewModel = useDressmakerViewModel({
    dressmakerId: userId as number,
    shouldFetch: true,
  });

  function onOpenDetailModal() {
    openModal("ProfileDetail");
  }

  function onOpenEditModal() {
    openModal("ProfileEdit");
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

  async function onDeleteOrderPhotosFolder() {
    try {
      const orderFolder = FileSystem.documentDirectory + "orderPhotos";
      const orderPhotosFolderInfo = await FileSystem.getInfoAsync(orderFolder);
      if (orderPhotosFolderInfo.exists) {
        await FileSystem.deleteAsync(orderFolder);
        console.log("Directory deleted");
      }
      Alert.alert(
        "Sucesso",
        "Diretório de fotos de modelo dos pedidos deletado com sucesso"
      );
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível remover o diretório de fotos de modelo dos pedidos"
      );
    }
  }

  async function onUpdateDressmakerName() {
    await viewModel.fetchDressmaker();
  }

  async function onUpdateDressmaker(
    dressmakerId: number,
    name: string,
    email: string
  ) {
    try {
      await viewModel.updateDressmaker(dressmakerId, name, email);
      await viewModel.fetchDressmaker();
      Alert.alert("Sucesso", "Dados da costureira atualizados com sucesso!");
      closeModal();
    } catch (error) {
      if (typeof error === "string") {
        return Alert.alert("Erro", error);
      }

      Alert.alert("Erro", "Não foi possível atualizar os dados da costureira");
    }
  }

  if (!userId) {
    logOut();
  }

  return {
    userId: userId as number,
    dressmaker: viewModel.dressmaker,
    modalType,
    onUpdateDressmakerName,
    onOpenDetailModal,
    onOpenEditModal,
    onOpenEditPasswordModal,
    onLogOut,
    isModalOpen,
    onDeleteAccount: showDeleteConfirmationAlert,
    onDeleteOrderPhotosFolder,
    onUpdateDressmaker,
  };
}
