import { useCallback, useState } from "react";
import { Adjust, AdjustCheckBox } from "../entities/Order";
import { useAdjustAdapter } from "../adapters/adjustAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface AdjustServiceCheckBoxData {
  adjusts: AdjustCheckBox[];
  toggleAdjust: (index: number) => void;
  getSelectedAdjusts: () => AdjustCheckBox[];
}

interface ViewModelArgs {
  adjusts: Adjust[];
  orderAdjusts?: AdjustCheckBox[];
}

export function useAdjustServiceCheckBoxViewModel({
  adjusts: _adjusts,
  orderAdjusts,
}: ViewModelArgs): AdjustServiceCheckBoxData {
  const adapter = useAdjustAdapter();

  const [adjusts, setAdjusts] = useState<AdjustCheckBox[]>([]);

  function toggleAdjust(index: number) {
    setAdjusts((prevAdjusts) => {
      const adjustsCopy = [...prevAdjusts];
      adjustsCopy[index].checked = !adjustsCopy[index].checked;
      return adjustsCopy;
    });
  }

  function getSelectedAdjusts(): AdjustCheckBox[] {
    return adjusts.filter((adjust) => adjust.checked);
  }

  useFocusEffect(
    useCallback(() => {
      if (orderAdjusts) {
        setAdjusts(
          [
            ...orderAdjusts,
            ...adapter.mapToAdjustCheckboxEntityList(_adjusts),
          ].sort((a, b) => a.id - b.id)
        );
      } else {
        setAdjusts(adapter.mapToAdjustCheckboxEntityList(_adjusts));
      }
    }, [_adjusts])
  );

  return { adjusts, toggleAdjust, getSelectedAdjusts };
}
