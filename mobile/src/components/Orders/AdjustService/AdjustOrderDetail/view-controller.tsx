import { OrderMode } from "../../../../contexts/OrderContext";
import { AdjustOrder } from "../../../../entities/Order";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { useAdjustOrderViewModel } from "../../../../view-models/useAdjustOrderViewModel";

interface ViewControllerData {
  mode: OrderMode | null;
  orderData: AdjustOrder | null;
  onFetchAdjustOrderData: () => Promise<void>;
}

interface ViewControllerArgs {
  orderId: number;
}

export function useViewController({
  orderId,
}: ViewControllerArgs): ViewControllerData {
  const adjustOrderViewModel = useAdjustOrderViewModel({
    orderId,
    shouldFetchData: true,
  });

  const { mode } = useOrderContext();

  return {
    mode,
    orderData: adjustOrderViewModel.adjustOrder,
    onFetchAdjustOrderData: adjustOrderViewModel.fetchAdjustOrder,
  };
}
