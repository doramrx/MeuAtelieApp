import {
  CustomerMeasure,
  CustomerMeasureView,
  Measure,
} from "../entities/Order";
import { MeasureRawData } from "../models/useMeasureModel";

interface AdapterFunctions {
  mapToEntityList: (rawData: MeasureRawData[]) => Measure[];
  mapMeasureToCustomerMeasureEntityList: (
    measures: Measure[]
  ) => CustomerMeasure[];
  mapMeasureToCustomerMeasureViewEntityList: (
    measures: Measure[]
  ) => CustomerMeasureView[];
  mapCustomerMeasureToCustomerMeasureViewEntity: (
    customerMeasure: CustomerMeasure
  ) => CustomerMeasureView;
  mapCustomerMeasureToCustomerMeasureViewEntityList: (
    customerMeasures: CustomerMeasure[]
  ) => CustomerMeasureView[];
  mapCustomerMeasureViewToCustomerMeasureEntityList: (
    customerMeasures: CustomerMeasureView[]
  ) => CustomerMeasure[];
}

export function useMeasureAdapter(): AdapterFunctions {
  function mapToEntity(rawData: MeasureRawData): Measure {
    return {
      id: rawData.id,
      name: rawData.measure,
    };
  }

  function mapToEntityList(rawData: MeasureRawData[]): Measure[] {
    return rawData.map(mapToEntity);
  }

  function mapMeasureToCustomerMeasureEntity(
    measure: Measure
  ): CustomerMeasure {
    return {
      measure: measure,
      value: 0,
    };
  }

  function mapMeasureToCustomerMeasureEntityList(
    measures: Measure[]
  ): CustomerMeasure[] {
    return measures.map(mapMeasureToCustomerMeasureEntity);
  }

  function mapMeasureToCustomerMeasureViewEntity(
    measure: Measure
  ): CustomerMeasureView {
    return {
      measure: measure,
      value: "",
    };
  }

  function mapMeasureToCustomerMeasureViewEntityList(
    measures: Measure[]
  ): CustomerMeasureView[] {
    return measures.map(mapMeasureToCustomerMeasureViewEntity);
  }

  function mapCustomerMeasureToCustomerMeasureViewEntity(
    customerMeasure: CustomerMeasure
  ): CustomerMeasureView {
    return {
      ...customerMeasure,
      value:
        customerMeasure.value === 0 ? "" : customerMeasure.value.toString(),
    };
  }

  function mapCustomerMeasureToCustomerMeasureViewEntityList(
    customerMeasures: CustomerMeasure[]
  ): CustomerMeasureView[] {
    return customerMeasures.map(mapCustomerMeasureToCustomerMeasureViewEntity);
  }

  function mapCustomerMeasureViewToCustomerMeasureEntity(
    customerMeasure: CustomerMeasureView
  ): CustomerMeasure {
    return {
      ...customerMeasure,
      value:
        customerMeasure.value.trim() === ""
          ? 0
          : Number(customerMeasure.value.replace(",", ".")),
    };
  }

  function mapCustomerMeasureViewToCustomerMeasureEntityList(
    customerMeasures: CustomerMeasureView[]
  ): CustomerMeasure[] {
    return customerMeasures.map(mapCustomerMeasureViewToCustomerMeasureEntity);
  }

  return {
    mapToEntityList,
    mapMeasureToCustomerMeasureEntityList,
    mapMeasureToCustomerMeasureViewEntityList,
    mapCustomerMeasureToCustomerMeasureViewEntity,
    mapCustomerMeasureToCustomerMeasureViewEntityList,
    mapCustomerMeasureViewToCustomerMeasureEntityList,
  };
}
