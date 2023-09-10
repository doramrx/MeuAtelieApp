import { AdjustRawData } from "../models/useAdjustServiceModel";
import { Adjust, AdjustCheckBox } from "../entities/Order";

interface AdapterFunctions {
  mapToEntityList: (rawData: AdjustRawData[]) => Adjust[];
  mapToAdjustCheckboxEntityList: (rawData: AdjustRawData[]) => AdjustCheckBox[];
}

export function useAdjustAdapter(): AdapterFunctions {
  function mapToEntity(rawData: AdjustRawData): Adjust {
    return {
      id: rawData.id,
      description: rawData.description,
      cost: rawData.cost,
    };
  }

  function mapToEntityList(rawData: AdjustRawData[]): Adjust[] {
    return rawData.map(mapToEntity);
  }

  function mapToAdjustCheckboxEntity(rawData: AdjustRawData): AdjustCheckBox {
    return {
      id: rawData.id,
      description: rawData.description,
      cost: rawData.cost,
      checked: false,
    };
  }

  function mapToAdjustCheckboxEntityList(
    rawData: AdjustRawData[]
  ): AdjustCheckBox[] {
    return rawData.map(mapToAdjustCheckboxEntity);
  }

  return {
    mapToEntityList,
    mapToAdjustCheckboxEntityList,
  };
}
