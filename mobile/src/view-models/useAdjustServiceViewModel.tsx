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

  const [adjusts, setAdjusts] = useState<Adjust[]>(
    viewModelArgs ? viewModelArgs.adjusts : []
  );

  async function fetchAdjusts(): Promise<void> {
    try {
      let rawAdjusts;
      const hasPreloadedAdjusts = adjusts.length > 0;

      if (hasPreloadedAdjusts) {
        rawAdjusts = await model.getAdjustsExclusive(
          adjusts.map((adjust) => adjust.id)
        );
      } else {
        rawAdjusts = await model.getAdjusts();
      }

      if (rawAdjusts.length > 0) {
        const adaptedAdjusts = adapter.mapToEntityList(rawAdjusts);

        if (hasPreloadedAdjusts) {
          setAdjusts((prevAdjusts) => [...prevAdjusts, ...adaptedAdjusts]);
        } else {
          setAdjusts(adaptedAdjusts);
        }
      }
    } catch {
      return Promise.reject();
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] - useFocusEffect - fetching adjust services...");
      fetchAdjusts();
    }, [])
  );

  return {
    adjusts,
  };
}
