import { useState } from "react";

import { Dressmaker } from "../entities/Dressmaker";
import { useDressmakerModel } from "../models/useDressmakerModel";
import { useDressmakerAdapter } from "../adapters/dressmakerAdapter";

interface DressmakerViewModelData {
  dressmaker: Dressmaker | null;
  getDressmakerById: (id: number) => Promise<void>;
  deleteDressmaker: (id: number) => Promise<boolean>;
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
    try {
      await model.deleteDressmaker(id);
      return true;
    } catch {
      return false;
    }
  }

  return {
    dressmaker,
    getDressmakerById,
    deleteDressmaker,
  };
}
