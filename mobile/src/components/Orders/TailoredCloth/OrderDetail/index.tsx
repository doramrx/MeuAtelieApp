import { Text, View } from "react-native";

import { DetailMode } from "./DetailMode";
import { EditMode } from "./EditMode";
import {
  useTailoredClothOrderDetailViewController,
  TailoredClothOrderDetailData,
} from "../../../../view-controllers/Order/useTailoredClothOrderDetailViewController";

interface Props {
  orderId: number;
  controller?: () => TailoredClothOrderDetailData;
}

export function TailoredClothOrderDetail({ orderId, controller }: Props) {
  const viewController = controller
    ? controller()
    : useTailoredClothOrderDetailViewController({ orderId });

  console.log(viewController.tailoredClothOrder);

  return viewController.tailoredClothOrder ? (
    <View style={{ paddingHorizontal: 25 }}>
      {viewController.mode === "detail" ? (
        <DetailMode
          orderId={orderId}
          orderData={viewController.tailoredClothOrder}
        />
      ) : (
        <EditMode
          orderId={orderId}
          orderData={viewController.tailoredClothOrder}
          getOrderData={() => {
            // Todo
          }}
        />
      )}
    </View>
  ) : (
    <View>
      <Text>Loading data...</Text>
    </View>
  );
}
