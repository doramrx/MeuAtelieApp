import { useState } from "react";
import { useAppContext } from "../../../../../hooks/useAppContext";
import {
  CustomerMeasure,
  CustomerMeasureView,
  TailoredClothOrder,
} from "../../../../../entities/Order";
import { useDatePicker } from "../../../../../utils/useDatePicker";
import { useMeasureViewModel } from "../../../../../view-models/useMeasureViewModel";
import { useCustomerMeasureViewModel } from "../../../../../view-models/useCustomerMeasureViewModel";
import { useOrderContext } from "../../../../../hooks/useOrderContext";
import { Alert } from "react-native";
import { useTailoredClothOrderViewModel } from "../../../../../view-models/useTailoredClothOrderViewModel";

interface ViewControllerArgs {
  orderId: number;
  tailoredClothOrder: TailoredClothOrder;
  getOrderData: (orderData: TailoredClothOrder) => void;
}

interface ViewControllerData {
  tailoredClothOrder: TailoredClothOrder;
  customerMeasures: CustomerMeasureView[];
  isModalOpen: boolean;
  inputCost: string;
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
}

export function useViewController({
  orderId,
  tailoredClothOrder,
  getOrderData,
}: ViewControllerArgs): ViewControllerData {
  const { openModal, isModalOpen, closeModal } = useAppContext();
  const { changeMode } = useOrderContext();

  const [orderData, setOrderData] =
    useState<TailoredClothOrder>(tailoredClothOrder);
  const [inputCost, setInputCost] = useState(orderData.cost.toString());

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

    try {
      await viewModel.updateTailoredClothOrder(orderData);
      getOrderData(orderData);
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

  return {
    tailoredClothOrder: orderData,
    customerMeasures: customerMeasureViewModel.customerMeasures,
    inputCost,
    isModalOpen,
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
  };
}
