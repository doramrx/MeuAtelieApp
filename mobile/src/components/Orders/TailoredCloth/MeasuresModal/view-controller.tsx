import { ModalTypeVariations } from "../../../../contexts/AppContext";
import { CustomerMeasure } from "../../../../entities/Order";
import { useAppContext } from "../../../../hooks/useAppContext";
import { useCustomerMeasureViewModel } from "../../../../view-models/useCustomerMeasureViewModel";
import { useMeasureViewModel } from "../../../../view-models/useMeasureViewModel";

interface ViewControllerData {
  customerMeasures: CustomerMeasure[];
  modalType: ModalTypeVariations | null;
  onCloseModal: () => void;
  onGetMeasures: () => void;
  onUpdateCustomerMeasure: (id: number, value: number) => void;
}

interface Props {
  getMeasuresCallback: (customerMeasures: CustomerMeasure[]) => void;
}

export function useViewController({
  getMeasuresCallback,
}: Props): ViewControllerData {
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
    onGetMeasures,
  };
}
