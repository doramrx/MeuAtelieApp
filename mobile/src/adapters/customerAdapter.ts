import { Customer } from "../entities/Customer";
import { CustomerRawData } from "../models/useCustomerModel";

interface AdapterFunctions {
  mapToEntity: (rawData: CustomerRawData) => Customer;
  mapToEntityList: (rawData: CustomerRawData[]) => Customer[];
}

export function useCustomerAdapter(): AdapterFunctions {
  function mapToEntity(rawData: CustomerRawData): Customer {
    return {
      id: rawData.id,
      name: rawData.name,
      phone: rawData.phone,
    };
  }

  function mapToEntityList(rawData: CustomerRawData[]): Customer[] {
    return rawData.map(mapToEntity);
  }

  return {
    mapToEntity,
    mapToEntityList,
  };
}
