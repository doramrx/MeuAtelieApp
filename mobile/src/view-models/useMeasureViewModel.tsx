import { useCallback, useState } from "react";
import { Measure } from "../entities/Order";
import { useMeasureModel } from "../models/useMeasureModel";
import { useMeasureAdapter } from "../adapters/measureAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface MeasureData {
  measures: Measure[];
}

export function useMeasureViewModel(): MeasureData {
  const model = useMeasureModel();
  const adapter = useMeasureAdapter();

  const [measures, setMeasures] = useState<Measure[]>([]);

  async function fetchMeasures(): Promise<void> {
    try {
      const measureRawData = await model.getMeasures();

      if (measureRawData.length > 0) {
        const measureList = adapter.mapToEntityList(measureRawData);

        setMeasures(measureList);
      }
    } catch {
      return Promise.reject();
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] MeasureViewModel - useFocusEffect");
      fetchMeasures();
    }, [])
  );

  return {
    measures,
  };
}
