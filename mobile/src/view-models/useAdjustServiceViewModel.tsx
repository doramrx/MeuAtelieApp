import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Adjust } from "../entities/Order";
import { useAdjustServiceModel } from "../models/useAdjustServiceModel";
import { useAdjustAdapter } from "../adapters/adjustAdapter";

interface AdjustServiceData {
  adjusts: Adjust[];
}

interface ViewModelArgs {
  adjusts: Adjust[];
}

export function useAdjustServiceViewModel(
  viewModelArgs?: ViewModelArgs
): AdjustServiceData {
  const adapter = useAdjustAdapter();
  const model = useAdjustServiceModel();

  const [adjusts, setAdjusts] = useState<Adjust[]>([]);

  async function fetchAdjusts(): Promise<void> {
    try {
      let rawAdjusts;
      const hasExistentAdjusts =
        !!viewModelArgs && viewModelArgs.adjusts.length > 0;

      if (hasExistentAdjusts) {
        rawAdjusts = await model.getAdjustsExclusive(
          viewModelArgs.adjusts.map((adjust) => adjust.id)
        );
      } else {
        rawAdjusts = await model.getAdjusts();
      }

      if (rawAdjusts.length > 0) {
        setAdjusts(adapter.mapToEntityList(rawAdjusts));
      }
    } catch {
      console.log("[ViewModel] rejecting on useAdjustServiceViewModel");
      return Promise.reject();
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] - useFocusEffect - fetching adjust services...");
      fetchAdjusts();
    }, [viewModelArgs?.adjusts])
  );

  return {
    adjusts,
  };
}
