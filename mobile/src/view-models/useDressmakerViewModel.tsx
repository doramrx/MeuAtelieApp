import { useCallback, useState } from "react";

import { Dressmaker } from "../entities/Dressmaker";
import { useDressmakerModel } from "../models/useDressmakerModel";
import { useDressmakerAdapter } from "../adapters/dressmakerAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface ViewModelArgs {
  dressmakerId: number;
  shouldFetch?: boolean;
}

interface DressmakerViewModelData {
  dressmaker: Dressmaker | null;
  getDressmakerById: (id: number) => Promise<void>;
  fetchDressmaker: () => Promise<void>;
  deleteDressmaker: (id: number) => Promise<boolean>;
  getDressmakerId: (email: string, password: string) => Promise<number>;
  createDressmaker: (
    name: string,
    email: string,
    password: string
  ) => Promise<number>;
  updateDressmaker: (
    dressmakerId: number,
    name: string,
    email: string
  ) => Promise<void>;
}

export function useDressmakerViewModel(
  args?: ViewModelArgs
): DressmakerViewModelData {
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

  async function fetchDressmaker() {
    if (!args) {
      return;
    }

    try {
      console.log("[ViewModel] - Fetching dressmaker...");
      const rawDressmakerData = await model.getDressmakerById(
        args.dressmakerId
      );
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

  async function updateDressmaker(
    dressmakerId: number,
    name: string,
    email: string
  ) {
    return await model.updateDressmaker(dressmakerId, name, email);
  }

  useFocusEffect(
    useCallback(() => {
      if (args && args.shouldFetch) {
        fetchDressmaker();
      }
    }, [])
  );

  return {
    dressmaker,
    createDressmaker,
    getDressmakerById,
    fetchDressmaker,
    deleteDressmaker,
    getDressmakerId: model.getDressmakerIdByEmailAndPassword,
    updateDressmaker,
  };
}
