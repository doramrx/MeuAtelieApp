import { OrderMode } from "../../contexts/OrderContext";
import { TailoredClothOrder } from "../../entities/Order";
import { useOrderContext } from "../../hooks/useOrderContext";
import { useTailoredClothOrderViewModel } from "../../view-models/useTailoredClothOrderViewModel";

export interface TailoredClothOrderDetailData {
  mode: OrderMode | null;
  tailoredClothOrder: TailoredClothOrder | null;
}

interface ControllerArgs {
  orderId: number;
}

export function useTailoredClothOrderDetailViewController({
  orderId,
}: ControllerArgs): TailoredClothOrderDetailData {
  const { mode } = useOrderContext();
  const viewModel = useTailoredClothOrderViewModel({ orderId });

  return {
    tailoredClothOrder: viewModel.tailoredClothOrder,
    mode,
  };
}
