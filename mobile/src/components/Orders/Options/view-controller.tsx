import { useState } from "react";

type OptionStates = "Pending" | "Finished";

interface ViewControllerData {
  activeOption: OptionStates;
  onChangeOption: (state: OptionStates) => void;
}

export function useViewController(): ViewControllerData {
  const [activeOption, setActiveOption] = useState<OptionStates>("Pending");

  function onChangeOption(option: OptionStates) {
    setActiveOption(option);
  }

  return {
    activeOption,
    onChangeOption,
  };
}
