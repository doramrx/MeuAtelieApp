import { Dressmaker } from "../entities/Dressmaker";
import { DressmakerRawData } from "../models/useDressmakerModel";

interface AdapterFunctions {
  mapToEntity: (rawData: DressmakerRawData) => Dressmaker;
}

export function useDressmakerAdapter(): AdapterFunctions {
  function mapToEntity(rawData: DressmakerRawData): Dressmaker {
    return {
      id: rawData.id,
      name: rawData.name,
      email: rawData.email,
    };
  }
  return {
    mapToEntity,
  };
}
