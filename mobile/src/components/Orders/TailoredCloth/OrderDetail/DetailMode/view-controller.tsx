import { useRef } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

import {
  CustomerMeasureView,
  ModelPhotoView,
  TailoredClothOrder,
} from "../../../../../entities/Order";
import { useOrderViewModel } from "../../../../../view-models/useOrderViewModel";
import { useWhatsappNotification } from "../../../../../utils/useWhatsappNotification";
import { useMeasureAdapter } from "../../../../../adapters/measureAdapter";
import { useAppContext } from "../../../../../hooks/useAppContext";
import { ModalTypeVariations } from "../../../../../contexts/AppContext";

interface Props {
  orderId: number;
  orderData: TailoredClothOrder | null;
}

interface ViewControllerData {
  isModalOpen: boolean;
  onGoBack: () => void;
  onFinishOrder: () => void;
  convertToCustomerMeasureView: () => CustomerMeasureView[];
  onGetModelPhoto: () => ModelPhotoView | null;
  onGetModelPhotos: () => ModelPhotoView[];
  onSelectPhoto: (modelPhotoIndex: number) => void;
}

export function useViewController({
  orderId,
  orderData,
}: Props): ViewControllerData {
  const navigation = useNavigation();
  const { sendMessage } = useWhatsappNotification();
  const adapter = useMeasureAdapter();

  const selectedModelPhoto = useRef<number>(0);

  const { isModalOpen, openModal } = useAppContext();

  const viewModel = useOrderViewModel({ shouldFetchData: false });

  async function onFinishOrder() {
    try {
      await viewModel.finishOrder(orderId);

      Alert.alert(
        "Sucesso",
        "Pedido finalizado com sucesso!\nDeseja enviar uma mensagem de notificação para o whatsapp do cliente?",
        [
          { text: "Sim", onPress: sendWhatsappMessage },
          { text: "Cancelar", style: "cancel" },
        ]
      );
    } catch {
      Alert.alert("Erro", "Houve um erro ao finalizar o pedido!");
    }
  }

  async function sendWhatsappMessage() {
    try {
      await sendMessage({
        order: orderData as TailoredClothOrder,
        orderType: "tailoredClothService",
      });
    } catch (reason) {
      Alert.alert(
        "Erro",
        "Não foi possível enviar a mensagem para o whatsapp do cliente!"
      );
    } finally {
      navigation.navigate("orders");
    }
  }

  function convertToCustomerMeasureView(): CustomerMeasureView[] {
    return adapter.mapCustomerMeasureToCustomerMeasureViewEntityList(
      orderData?.measures || []
    );
  }

  function onGetModelPhoto() {
    if (!orderData || orderData.modelPhotos.length === 0) {
      return null;
    }

    const modelPhoto = orderData.modelPhotos[selectedModelPhoto.current];
    const photoURI =
      FileSystem.documentDirectory +
      `orderPhotos/${orderData.id}/${modelPhoto.filename}`;

    return {
      id: modelPhoto.id,
      uri: photoURI,
    };
  }

  function onGetModelPhotos() {
    if (!orderData || orderData.modelPhotos.length === 0) {
      return [];
    }

    const orderPhotosFolder =
      FileSystem.documentDirectory + `orderPhotos/${orderData.id}/`;

    return orderData.modelPhotos.map((modelPhoto) => {
      return {
        id: modelPhoto.id,
        uri: orderPhotosFolder.concat(modelPhoto.filename),
      };
    });
  }

  function onSelectPhoto(modelPhotoIndex: number) {
    selectedModelPhoto.current = modelPhotoIndex;

    openModal("ModelPhotoView");
  }

  return {
    isModalOpen,
    onGoBack: navigation.goBack,
    onFinishOrder,
    convertToCustomerMeasureView,
    onGetModelPhoto,
    onGetModelPhotos,
    onSelectPhoto,
  };
}
