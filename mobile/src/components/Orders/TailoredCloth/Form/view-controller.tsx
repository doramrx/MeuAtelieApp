import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import {
  CustomerMeasureView,
  ModelPhotoView,
} from "../../../../entities/Order";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { useMeasureViewModel } from "../../../../view-models/useMeasureViewModel";
import { useCustomerMeasureViewModel } from "../../../../view-models/useCustomerMeasureViewModel";
import { useTailoredClothOrderViewModel } from "../../../../view-models/useTailoredClothOrderViewModel";
import { useDatePicker } from "../../../../utils/useDatePicker";
import { useAppContext } from "../../../../hooks/useAppContext";
import { database } from "../../../../database/database";

export interface ModelPhoto {
  uri: string;
}

interface ViewControllerData {
  title: string;
  description: string;
  measures: CustomerMeasureView[];
  cost: string;
  dueDate: Date;
  isModalOpen: boolean;
  isBottomModalOpen: boolean;
  modelPhotos: ModelPhotoView[];
  canAddMorePhotos: () => boolean;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onUpdateCost: (cost: string) => void;
  onOpenDateTimePicker: () => void;
  onUpdateCustomerMeasure: (measureId: number, value: string) => void;
  onCreateOrder: () => void;
  onOpenBottomModal: () => void;
  onChooseCameraSource: () => Promise<void>;
  onChooseGallerySource: () => Promise<void>;
  onSelectPhoto: (modelPhotoIndex: number) => void;
  onGetModelPhoto: () => ModelPhotoView | null;
  onRemoveModelPhoto: () => void;
  onGoToAgenda: () => void;
}

export function useViewController(): ViewControllerData {
  const navigation = useNavigation();
  const { selectedCustomerId } = useOrderContext();
  const {
    isModalOpen,
    isBottomModalOpen,
    openModal,
    openBottomModal,
    closeModal,
    closeBottomModal,
  } = useAppContext();

  const measureViewModel = useMeasureViewModel();
  const customerMeasureViewModel = useCustomerMeasureViewModel({
    measures: measureViewModel.measures,
  });
  const tailoredClothOrderViewModel = useTailoredClothOrderViewModel({
    shouldFetchData: false,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [modelPhotos, setModelPhotos] = useState<ModelPhotoView[]>([]);

  const selectedModelPhoto = useRef<number>(0);

  const { openDateTimePicker } = useDatePicker({
    someDate: dueDate,
    setDate: setDueDate,
  });

  function onUpdateTitle(title: string) {
    setTitle(title);
  }

  function onUpdateDescription(description: string) {
    setDescription(description);
  }

  function onUpdateCost(cost: string) {
    setCost(cost);
  }

  async function onCreateOrder() {
    if (!selectedCustomerId) {
      return Alert.alert("Erro", "Nenhum cliente foi selecionado!");
    }

    // console.log(modelPhotos);

    try {
      const modelPhotosFileName = modelPhotos.map((modelPhoto) =>
        modelPhoto.uri.split("/").at(-1)
      );
      console.log(modelPhotosFileName);

      // const folder = FileSystem.documentDirectory + "orderPhotos";
      // await FileSystem.makeDirectoryAsync(folder);

      // console.log(await FileSystem.getInfoAsync(folder));

      // await FileSystem.deleteAsync(folder);

      // console.log(await FileSystem.getInfoAsync(modelPhotos[0].uri));
      // await FileSystem.makeDirectoryAsync("file://orderPhotos");
      // console.log("Diretório criado com sucesso!");
    } catch (error) {
      console.log(error);
    }

    // const result = FileSystem.readDirectoryAsync("file://orders/");
    // console.log(result);

    try {
      const modelPhotosFileName = modelPhotos.map((modelPhoto) => {
        const splittedURI = modelPhoto.uri.split("/");
        return splittedURI[splittedURI.length - 1];
      });

      const orderFolder = FileSystem.documentDirectory + "orderPhotos";
      console.log(`orderFolder: ${orderFolder}`);
      const orderPhotosFolderInfo = await FileSystem.getInfoAsync(orderFolder);
      //!Code to delete photo model folder
      if (orderPhotosFolderInfo.exists) {
        await FileSystem.deleteAsync(orderFolder);
        console.log("Directory deleted");
        return;
      }

      const { orderItemId } = await tailoredClothOrderViewModel.createNewOrder({
        clothTitle: title,
        clothDescription: description,
        cost: Number(cost.replace(",", ".")),
        dueDate,
        createdAt: new Date(),
        customerId: selectedCustomerId,
        customerMeasures: customerMeasureViewModel.convertToCustomerMeasure(),
        modelPhotoFileName: modelPhotosFileName,
      });

      if (modelPhotosFileName.length === 0) {
        Alert.alert("Sucesso", "Pedido cadastrado com sucesso!");
        navigation.navigate("orders");
        return;
      }

      console.log("folderInfo:");
      console.log(orderPhotosFolderInfo);

      if (!orderPhotosFolderInfo.exists) {
        console.log("Folder does not exist");
        await FileSystem.makeDirectoryAsync(orderFolder);
      }
      const orderItemPhotosFolder = orderFolder.concat(`/${orderItemId}/`);
      console.log("orderItemPhotosFolder:");
      console.log(orderItemPhotosFolder);

      await FileSystem.makeDirectoryAsync(orderItemPhotosFolder);
      const orderItemFolderInfo = await FileSystem.getInfoAsync(
        orderItemPhotosFolder
      );
      console.log("orderItemFolderInfo:");
      console.log(orderItemFolderInfo);

      if (!orderItemFolderInfo.exists) {
        console.log("Deu ruim e não foi possível criar os diretórios!");
        Alert.alert("Não foi possível salvar as fotos de modelo");
        return;
      }

      console.log(modelPhotosFileName);

      modelPhotosFileName.forEach(async (fileName, index) => {
        await FileSystem.copyAsync({
          from: modelPhotos[index].uri,
          to: orderItemPhotosFolder.concat(fileName),
        });
      });

      console.log(await FileSystem.readDirectoryAsync(orderItemPhotosFolder));
      Alert.alert("Sucesso", "Pedido cadastrado com sucesso!");
      navigation.navigate("orders");
    } catch (reason) {
      if (typeof reason === "string") {
        Alert.alert("Erro", reason);
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o pedido!");
      }
    }
  }

  async function onGoToAgenda() {
    const folder = FileSystem.documentDirectory + "orderPhotos/1";

    try {
      console.log(await FileSystem.readDirectoryAsync(folder));
    } catch (error) {
      console.log(error);
    }

    database?.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM clothing_photos;",
        undefined,
        (_, resultSet) => {
          resultSet.rows._array.forEach((row) => {
            console.log(row);
            console.log("------------------------------------------");
          });
        }
      );
    });
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

  function canAddMorePhotos() {
    return modelPhotos.filter((photoModel) => photoModel !== null).length < 3;
  }

  function onSelectPhoto(modelPhotoIndex: number) {
    selectedModelPhoto.current = modelPhotoIndex;

    openModal("ModelPhotoView");
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

  useFocusEffect(
    useCallback(() => {
      customerMeasureViewModel.initCustomerMeasures();
    }, [])
  );

  return {
    title,
    description,
    measures: customerMeasureViewModel.customerMeasures,
    cost,
    dueDate,
    isModalOpen,
    isBottomModalOpen,
    modelPhotos,
    canAddMorePhotos,
    onUpdateTitle,
    onUpdateDescription,
    onUpdateCost,
    onOpenDateTimePicker: openDateTimePicker,
    onUpdateCustomerMeasure: customerMeasureViewModel.updateCustomerMeasure,
    onCreateOrder,
    onOpenBottomModal: openBottomModal,
    onChooseCameraSource,
    onChooseGallerySource,
    onSelectPhoto,
    onGetModelPhoto,
    onRemoveModelPhoto,
    onGoToAgenda,
  };
}
