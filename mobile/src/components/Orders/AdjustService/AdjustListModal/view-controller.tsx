import { AdjustCheckBox } from "../../../../entities/Order";
import { useAppContext } from "../../../../hooks/useAppContext";
import { useAdjustServiceCheckBoxViewModel } from "../../../../view-models/useAdjustServiceCheckBoxViewModel";
import { useAdjustServiceViewModel } from "../../../../view-models/useAdjustServiceViewModel";

interface AdjustListModalData {
  adjusts: AdjustCheckBox[];
  onCloseModal: () => void;
  onToggleAdjust: (index: number) => void;
  onGetAdjusts: () => void;
}

interface ControllerArgs {
  adjusts: AdjustCheckBox[];
  onGetAdjusts: (adjusts: AdjustCheckBox[]) => void;
}

export function useViewController({
  adjusts,
  onGetAdjusts: _onGetAdjusts,
}: ControllerArgs): AdjustListModalData {
  const { closeModal } = useAppContext();

  const adjustServiceViewModel = useAdjustServiceViewModel({ adjusts });
  const adjustServiceCheckBoxViewModel = useAdjustServiceCheckBoxViewModel({
    adjusts: adjustServiceViewModel.adjusts,
    orderAdjusts: adjusts,
  });

  function onGetAdjusts() {
    _onGetAdjusts(adjustServiceCheckBoxViewModel.getSelectedAdjusts());
    closeModal();
  }

  return {
    adjusts: adjustServiceCheckBoxViewModel.adjusts,
    onToggleAdjust: adjustServiceCheckBoxViewModel.toggleAdjust,
    onCloseModal: closeModal,
    onGetAdjusts,
  };
}
