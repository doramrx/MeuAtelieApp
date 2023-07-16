import { ReactNode, createContext, useState } from "react";

interface OrderData {
  selectedCustomerId: number | null;
  selectCustomer: (id: number) => void;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderData);

export function OrderContextProvider({ children }: ProviderProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(1);

  function selectCustomer(id: number) {
    setSelectedCustomerId(id);
  }

  function nextStep() {
    setCurrentStep(2);
  }

  function previousStep() {
    setCurrentStep(1);
  }

  return (
    <OrderContext.Provider
      value={{
        selectedCustomerId,
        selectCustomer,
        currentStep,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
