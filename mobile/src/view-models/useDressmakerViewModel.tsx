import { useState } from "react";

import { Dressmaker } from "../entities/Dressmaker";
import { useDressmakerModel } from "../models/useDressmakerModel";
import { useDressmakerAdapter } from "../adapters/dressmakerAdapter";

interface DressmakerViewModelData {
  dressmaker: Dressmaker | null;
  getDressmakerById: (id: number) => Promise<void>;
  deleteDressmaker: (id: number) => Promise<boolean>;
  getDressmakerId: (email: string, password: string) => Promise<number>;
  createDressmaker: (
    name: string,
    email: string,
    password: string
  ) => Promise<number>;
}

export function useDressmakerViewModel(): DressmakerViewModelData {
  const dressmakerAdapter = useDressmakerAdapter();
  const model = useDressmakerModel();

  const [dressmaker, setDressmaker] = useState<Dressmaker | null>(null);

  async function getDressmakerById(id: number) {
    try {
      console.log("[ViewModel] - Fetching dressmaker...");
      const rawDressmakerData = await model.getDressmakerById(id);
      const dressmakerData = dressmakerAdapter.mapToEntity(rawDressmakerData);

      setDressmaker(() => dressmakerData);
    } catch {
      console.log("[ViewModel] - Fetch Dressmaker failed!");
    }
  }

  async function deleteDressmaker(id: number) {
    return Promise.resolve(model.deleteDressmaker(id));
  }

  async function createDressmaker(
    name: string,
    email: string,
    password: string
  ): Promise<number> {
    try {
      const dressmakerAlreadyExists = await model.checkIfExists(email);

      if (dressmakerAlreadyExists) {
        return Promise.reject("Email já cadastrado!");
      }

      return await model.createDressmaker(name, email, password);
    } catch {
      return Promise.reject("Não foi possível concluir o cadastro");
    }
  }

  return {
    dressmaker,
    createDressmaker,
    getDressmakerById,
    deleteDressmaker,
    getDressmakerId: model.getDressmakerIdByEmailAndPassword,
  };
}
