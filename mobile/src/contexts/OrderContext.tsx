import { ReactNode, createContext, useState } from "react";

interface OrderData {
  selectedCustomerId: number | null;
  selectCustomer: (id: number) => void;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  mode: OrderMode | null;
  changeMode: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

type OrderMode = "edit" | "detail";

export const OrderContext = createContext({} as OrderData);

export function OrderContextProvider({ children }: ProviderProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [mode, setMode] = useState<OrderMode | null>("detail");

  function selectCustomer(id: number) {
    setSelectedCustomerId(id);
  }

  function nextStep() {
    setCurrentStep(2);
  }

  function previousStep() {
    setCurrentStep(1);
  }

  function changeMode() {
    if (mode === "detail") {
      setMode("edit");
    } else {
      setMode("detail");
    }
  }

  return (
    <OrderContext.Provider
      value={{
        selectedCustomerId,
        selectCustomer,
        currentStep,
        nextStep,
        previousStep,
        mode,
        changeMode,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
