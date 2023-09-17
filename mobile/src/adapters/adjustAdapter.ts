import { AdjustRawData } from "../models/useAdjustServiceModel";
import { Adjust, AdjustCheckBox } from "../entities/Order";

interface AdapterFunctions {
  mapToEntityList: (rawData: AdjustRawData[]) => Adjust[];
  mapFromAdjustToAdjustCheckBoxEntity: (rawData: Adjust) => AdjustCheckBox;
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

  function mapFromAdjustToAdjustCheckBoxEntity(adjust: Adjust): AdjustCheckBox {
    return {
      id: adjust.id,
      description: adjust.description,
      cost: adjust.cost,
      checked: false,
    };
  }

  return {
    mapToEntityList,
    mapToAdjustCheckboxEntityList,
    mapFromAdjustToAdjustCheckBoxEntity,
  };
}
