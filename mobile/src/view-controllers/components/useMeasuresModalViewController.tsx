import { ModalTypeVariations } from "../../contexts/AppContext";
import { CustomerMeasure } from "../../entities/Order";
import { useAppContext } from "../../hooks/useAppContext";
import { useCustomerMeasureViewModel } from "../../view-models/useCustomerMeasureViewModel";
import { useMeasureViewModel } from "../../view-models/useMeasureViewModel";

interface MeasureListModalData {
  customerMeasures: CustomerMeasure[];
  modalType: ModalTypeVariations | null;
  onCloseModal: () => void;
  onGetMeasures: () => void;
  onUpdateCustomerMeasure: (id: number, value: number) => void;
}

interface ControllerArgs {
  getMeasuresCallback: (customerMeasures: CustomerMeasure[]) => void;
}

export function useMeasureListModalViewController({
  getMeasuresCallback,
}: ControllerArgs): MeasureListModalData {
  const { closeModal, modalType } = useAppContext();
  const measureViewModel = useMeasureViewModel();
  const customerMeasureViewModel = useCustomerMeasureViewModel({
    measures: measureViewModel.measures,
  });

  function onGetMeasures() {
    getMeasuresCallback(
      customerMeasureViewModel.customerMeasures.filter(
        (customerMeasure) => customerMeasure.value !== 0
      )
    );
    closeModal();
  }

  return {
    customerMeasures: customerMeasureViewModel.customerMeasures,
    modalType,
    onCloseModal: closeModal,
    onUpdateCustomerMeasure: customerMeasureViewModel.updateCustomerMeasure,
    onGetMeasures
  };
}
