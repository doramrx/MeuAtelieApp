import { useCallback, useState } from "react";

import {
  CustomerMeasure,
  CustomerMeasureView,
  Measure,
} from "../entities/Order";
import { useMeasureAdapter } from "../adapters/measureAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface CustomerMeasureData {
  customerMeasures: CustomerMeasureView[];
  updateCustomerMeasure: (id: number, value: string) => void;
  initCustomerMeasures: (
    customerMeasures?: CustomerMeasure[],
    shouldLoadAllMeasures?: boolean
  ) => void;
  convertToCustomerMeasure: () => CustomerMeasure[];
  convertCustomerMeasureToCustomerMeasureView(
    customerMeasures: CustomerMeasure[]
  ): CustomerMeasureView[];
}

interface CustomerMeasureArgs {
  measures: Measure[];
}

export function useCustomerMeasureViewModel({
  measures,
}: CustomerMeasureArgs): CustomerMeasureData {
  const adapter = useMeasureAdapter();

  const [customerMeasures, setCustomerMeasures] = useState<
    CustomerMeasureView[]
  >([]);

  function updateCustomerMeasure(id: number, value: string) {
    setCustomerMeasures((prevMeasures) => {
      return prevMeasures.map((measure) => {
        return measure.measure.id === id ? { ...measure, value } : measure;
      });
    });
  }

  function convertToCustomerMeasure(): CustomerMeasure[] {
    return adapter.mapCustomerMeasureViewToCustomerMeasureEntityList(
      customerMeasures.filter(
        (customerMeasure) =>
          customerMeasure.value !== "" && customerMeasure.value !== "0"
      )
    );
  }

  function convertCustomerMeasureToCustomerMeasureView(
    customerMeasures: CustomerMeasure[]
  ): CustomerMeasureView[] {
    return adapter.mapCustomerMeasureToCustomerMeasureViewEntityList(
      customerMeasures
    );
  }

  function initCustomerMeasures(
    customerMeasuresToPreload?: CustomerMeasure[],
    shouldLoadAllMeasures?: boolean
  ) {
    if (!customerMeasuresToPreload) {
      setCustomerMeasures(
        adapter.mapMeasureToCustomerMeasureViewEntityList(measures)
      );
      return;
    }

    if (shouldLoadAllMeasures) {
      setCustomerMeasures(() => {
        return adapter
          .mapMeasureToCustomerMeasureViewEntityList(measures)
          .map((customerMeasure) => {
            const preloadCustomerMeasure = customerMeasuresToPreload.find(
              (preloadCustomerMeasure) =>
                preloadCustomerMeasure.measure.id === customerMeasure.measure.id
            );
            if (preloadCustomerMeasure) {
              return adapter.mapCustomerMeasureToCustomerMeasureViewEntity(
                preloadCustomerMeasure
              );
            }
            return customerMeasure;
          });
      });
      return;
    }

    setCustomerMeasures(() => {
      return customerMeasuresToPreload.map(
        adapter.mapCustomerMeasureToCustomerMeasureViewEntity
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("[ViewModel] CustomerMeasure - useFocusEffect");
      initCustomerMeasures();
    }, [measures])
  );

  return {
    customerMeasures,
    updateCustomerMeasure,
    initCustomerMeasures,
    convertToCustomerMeasure,
    convertCustomerMeasureToCustomerMeasureView,
  };
}
