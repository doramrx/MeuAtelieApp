import { OrderMode } from "../../../../contexts/OrderContext";
import { TailoredClothOrder } from "../../../../entities/Order";
import { useOrderContext } from "../../../../hooks/useOrderContext";
import { useTailoredClothOrderViewModel } from "../../../../view-models/useTailoredClothOrderViewModel";

export interface TailoredClothOrderDetailData {
  mode: OrderMode | null;
  tailoredClothOrder: TailoredClothOrder | null;
  onFetchAdjustOrderData: () => Promise<void>;
}

interface ControllerArgs {
  orderId: number;
}

export function useViewController({
  orderId,
}: ControllerArgs): TailoredClothOrderDetailData {
  const { mode } = useOrderContext();
  const viewModel = useTailoredClothOrderViewModel({ orderId });

  return {
    tailoredClothOrder: viewModel.tailoredClothOrder,
    mode,
    onFetchAdjustOrderData: viewModel.fetchTailoredClothOrder,
  };
}
