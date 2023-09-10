import { CustomerMeasure, Measure } from "../entities/Order";
import { MeasureRawData } from "../models/useMeasureModel";

interface AdapterFunctions {
  mapToEntityList: (rawData: MeasureRawData[]) => Measure[];
  mapMeasureToCustomerMeasureEntityList: (
    measures: Measure[]
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

  return {
    mapToEntityList,
    mapMeasureToCustomerMeasureEntityList,
  };
}
