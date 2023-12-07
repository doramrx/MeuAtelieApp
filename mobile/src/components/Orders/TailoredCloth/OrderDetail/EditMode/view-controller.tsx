import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import {
  CustomerMeasure,
  CustomerMeasureView,
  ModelPhoto,
  ModelPhotoView,
  TailoredClothOrder,
} from "../../../../../entities/Order";
import { useDatePicker } from "../../../../../utils/useDatePicker";
import { useMeasureViewModel } from "../../../../../view-models/useMeasureViewModel";
import { useCustomerMeasureViewModel } from "../../../../../view-models/useCustomerMeasureViewModel";
import { useOrderContext } from "../../../../../hooks/useOrderContext";
import { useTailoredClothOrderViewModel } from "../../../../../view-models/useTailoredClothOrderViewModel";
import { useAppContext } from "../../../../../hooks/useAppContext";
import { database } from "../../../../../database/database";

interface ViewControllerArgs {
  orderId: number;
  tailoredClothOrder: TailoredClothOrder;
  onTriggerFetchOrderData: () => Promise<void>;
}

interface ViewControllerData {
  tailoredClothOrder: TailoredClothOrder;
  customerMeasures: CustomerMeasureView[];
  isModalOpen: boolean;
  isBottomModalOpen: boolean;
  inputCost: string;
  modelPhotos: ModelPhotoView[];
  onSelectPhoto: (modelPhotoIndex: number) => void;
  canAddMorePhotos: () => boolean;
  onOpenBottomModal: () => void;
  onGetModelPhoto: () => ModelPhotoView | null;
  onRemoveModelPhoto: () => void;
  onChangeTitle: (title: string) => void;
  onChangeDescription: (description: string) => void;
  onChangeCost: (cost: string) => void;
  onChangeDueDate: (dueDate: Date) => void;
  onChangeMeasures: (customerMeasures: CustomerMeasure[]) => void;
  onOpenMeasureListModal: () => void;
  onCloseModal: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFinishEdition: () => void;
  onOpenDatePicker: () => void;
  onUpdateCustomerMeasure: (id: number, value: string) => void;
  onGetCustomerMeasures: () => CustomerMeasureView[];
  onChooseCameraSource: () => Promise<void>;
  onChooseGallerySource: () => Promise<void>;
}

export function useViewController({
  orderId,
  tailoredClothOrder,
  onTriggerFetchOrderData,
}: ViewControllerArgs): ViewControllerData {
  const {
    isModalOpen,
    isBottomModalOpen,
    openBottomModal,
    openModal,
    closeModal,
    closeBottomModal,
  } = useAppContext();
  const { changeMode } = useOrderContext();

  const [orderData, setOrderData] =
    useState<TailoredClothOrder>(tailoredClothOrder);
  const [inputCost, setInputCost] = useState(orderData.cost.toString());
  const [modelPhotos, setModelPhotos] = useState<ModelPhotoView[]>([]);

  const selectedModelPhoto = useRef<number>(0);

  const viewModel = useTailoredClothOrderViewModel({
    orderId,
    shouldFetchData: false,
  });
  const measureViewModel = useMeasureViewModel();
  const customerMeasureViewModel = useCustomerMeasureViewModel({
    measures: measureViewModel.measures,
  });

  const { openDateTimePicker } = useDatePicker({
    someDate: orderData.dueDate,
    setDate: onChangeDueDate,
  });

  function onChangeTitle(title: string) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return { ...prevState, title };
    });
  }

  function onChangeDescription(description: string) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return { ...prevState, description };
    });
  }

  function onChangeCost(cost: string) {
    setInputCost(cost);
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        ...prevState,
        cost: Number(cost.replace(",", ".")),
      };
    });
  }

  function onChangeDueDate(dueDate: Date) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        ...prevState,
        dueDate,
      };
    });
  }

  function onChangeMeasures(customerMeasures: CustomerMeasure[]) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        ...prevState,
        measures: customerMeasures,
      };
    });
  }

  function onOpenMeasureListModal() {
    customerMeasureViewModel.initCustomerMeasures(orderData.measures, true);
    openModal("MeasureList");
  }

  async function onSave() {
    if (!orderData) {
      return Alert.alert("Erro", "Não existem dados para serem atualizados!");
    }

    // console.log("old model photos");
    // console.log(tailoredClothOrder.modelPhotos);
    // console.log("----------------------------------------------");
    // console.log("new model photos");
    // console.log(modelPhotos);
    // console.log("----------------------------------------------");

    // console.log("----------------------------------------------");
    // console.log(
    //   modelPhotos.filter((modelPhoto) => modelPhoto.id === undefined)
    // );

    try {
      await viewModel.updateTailoredClothOrder({
        orderId,
        orderItemId: orderData.id,
        cost: orderData.cost,
        customerMeasures: orderData.measures,
        description: orderData.description || "",
        title: orderData.title,
        dueDate: orderData.dueDate,
        modelPhotos,
      });

      const orderItemFolder =
        FileSystem.documentDirectory + `orderPhotos/${orderData.id}/`;

      const photosToRemove: ModelPhoto[] = [];
      tailoredClothOrder.modelPhotos.forEach((orderModelPhoto) => {
        let exists = false;

        for (const photo of modelPhotos) {
          if (photo !== undefined && orderModelPhoto.id === photo.id) {
            exists = true;
            break;
          }
        }

        if (!exists) {
          console.log("elemento não existe");
          console.log(orderModelPhoto);
          photosToRemove.push(orderModelPhoto);
        }
      });

      photosToRemove.forEach(async (modelPhoto) => {
        await FileSystem.deleteAsync(
          orderItemFolder.concat(modelPhoto.filename)
        );
        console.log(`arquivo ${modelPhoto.filename} deletado com sucesso!`);
      });

      const photosToCopy = modelPhotos.filter(
        (modelPhoto) => modelPhoto.id === undefined
      );

      photosToCopy.forEach(async (modelPhoto) => {
        const filePath = modelPhoto.uri.split("/").at(-1) as string;

        await FileSystem.copyAsync({
          from: modelPhoto.uri,
          to: orderItemFolder.concat(filePath),
        });
        console.log(`arquivo ${filePath} criado com sucesso`);
      });

      await onTriggerFetchOrderData();
      changeMode();
    } catch (error) {
      if (typeof error === "string") {
        return Alert.alert("Erro", error);
      }

      Alert.alert("Erro", "Não foi possível atualizar os dados do pedido");
    }
  }

  function onFinishEdition() {
    console.log("onFinishEdition");
    onChangeMeasures(customerMeasureViewModel.convertToCustomerMeasure());
    closeModal();
  }

  function onGetCustomerMeasures(): CustomerMeasureView[] {
    return customerMeasureViewModel.convertCustomerMeasureToCustomerMeasureView(
      orderData.measures
    );
  }

  function onSelectPhoto(modelPhotoIndex: number) {
    selectedModelPhoto.current = modelPhotoIndex;

    openModal("ModelPhotoView");
  }

  function canAddMorePhotos() {
    return modelPhotos.filter((photoModel) => photoModel !== null).length < 3;
  }

  function onGetModelPhoto() {
    if (modelPhotos.length === 0) {
      return null;
    }

    return modelPhotos[selectedModelPhoto.current];
  }

  function onRemoveModelPhoto() {
    if (modelPhotos.length > 0) {
      setModelPhotos((prevState) => {
        prevState.splice(selectedModelPhoto.current, 1);

        return [...prevState];
      });
      closeModal();
    }
  }

  async function onChooseCameraSource() {
    if (!canAddMorePhotos) {
      return;
    }

    //!Uncomment this before do commit
    // const cameraPermission = await ImagePicker.getCameraPermissionsAsync();

    // if (!cameraPermission.granted) {
    //   const requestPermissionsResponse =
    //     await ImagePicker.requestCameraPermissionsAsync();

    //   if (!requestPermissionsResponse.granted) {
    //     Alert.alert(
    //       "Erro ao abrir a câmera",
    //       "Sem permissões para abrir a câmera"
    //     );
    //     return;
    //   }
    // }

    const loadedImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (loadedImage.canceled) {
      closeBottomModal();
      return;
    }

    setModelPhotos((prevState) => {
      return [
        ...prevState,
        {
          uri: loadedImage.assets[0].uri,
        },
      ];
    });
    closeBottomModal();
  }

  async function onChooseGallerySource() {
    if (!canAddMorePhotos) {
      return;
    }

    //!Uncomment this before do commit
    // const galleryPermission =
    //   await ImagePicker.getMediaLibraryPermissionsAsync();

    // if (!galleryPermission.granted) {
    //   const requestPermissionsResponse =
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();

    //   if (!requestPermissionsResponse.granted) {
    //     Alert.alert(
    //       "Erro ao abrir a galeria",
    //       "Sem permissões para abrir a galeria"
    //     );
    //     return;
    //   }
    // }

    const loadedImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (loadedImage.canceled) {
      closeBottomModal();
      return;
    }

    setModelPhotos((prevState) => {
      return [
        ...prevState,
        {
          uri: loadedImage.assets[0].uri,
        },
      ];
    });
    closeBottomModal();
  }

  function onOpenBottomModal() {
    openBottomModal("ImageSourceSelection");
  }

  useFocusEffect(
    useCallback(() => {
      if (tailoredClothOrder.modelPhotos.length > 0) {
        const modelPhotoFolder =
          FileSystem.documentDirectory +
          `orderPhotos/${tailoredClothOrder.id}/`;

        setModelPhotos(() => {
          return tailoredClothOrder.modelPhotos.map((modelPhoto) => {
            return {
              id: modelPhoto.id,
              uri: modelPhotoFolder.concat(modelPhoto.filename),
            };
          });
        });
      }
    }, [])
  );

  return {
    tailoredClothOrder: orderData,
    customerMeasures: customerMeasureViewModel.customerMeasures,
    inputCost,
    isModalOpen,
    isBottomModalOpen,
    modelPhotos,
    onSelectPhoto,
    canAddMorePhotos,
    onOpenBottomModal,
    onRemoveModelPhoto,
    onGetModelPhoto,
    onChangeTitle,
    onChangeDescription,
    onChangeCost,
    onChangeDueDate,
    onChangeMeasures,
    onOpenMeasureListModal,
    onCloseModal: closeModal,
    onSave,
    onCancel: changeMode,
    onFinishEdition,
    onOpenDatePicker: openDateTimePicker,
    onUpdateCustomerMeasure: customerMeasureViewModel.updateCustomerMeasure,
    onGetCustomerMeasures,
    onChooseCameraSource,
    onChooseGallerySource,
  };
}
