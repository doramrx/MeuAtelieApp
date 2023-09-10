import { useCallback, useState } from "react";

import { CustomerMeasure, Measure } from "../entities/Order";
import { useMeasureAdapter } from "../adapters/measureAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface CustomerMeasureData {
  customerMeasures: CustomerMeasure[];
  updateCustomerMeasure: (id: number, value: number) => void;
}

interface CustomerMeasureArgs {
  measures: Measure[];
}

export function useCustomerMeasureViewModel({
  measures,
}: CustomerMeasureArgs): CustomerMeasureData {
  const adapter = useMeasureAdapter();

  const [customerMeasures, setCustomerMeasures] = useState<CustomerMeasure[]>(
    []
  );

  function updateCustomerMeasure(id: number, value: number) {
    console.log("[ViewController] Updating customer measure...");
    console.log(value);

    setCustomerMeasures((prevMeasures) => {
      return prevMeasures.map((measure) => {
        return measure.measure.id === id ? { ...measure, value } : measure;
      });
    });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] CustomerMeasure - useFocusEffect");
      setCustomerMeasures(
        adapter.mapMeasureToCustomerMeasureEntityList(measures)
      );
    }, [measures])
  );

  return {
    customerMeasures,
    updateCustomerMeasure,
  };
}
