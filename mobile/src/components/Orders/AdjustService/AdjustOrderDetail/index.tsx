import { Fragment } from "react";
import { Text, View } from "react-native";

import { DetailMode } from "./DetailMode";
import { EditMode } from "./EditMode";
import { useViewController } from "./view-controller";

interface Props {
  orderId: number;
}

export function AdjustOrderDetail({ orderId }: Props) {
  const viewController = useViewController({ orderId });

  return viewController.orderData ? (
    <Fragment>
      {viewController.mode === "detail" ? (
        <DetailMode
          orderId={orderId}
          orderData={viewController.orderData}
        />
      ) : (
        <EditMode
          orderId={orderId}
          customerData={viewController.orderData.customer}
          orderItemsData={viewController.orderData.orderItems}
          orderDueDate={viewController.orderData.dueDate}
          onTriggerFetchOrderData={viewController.onFetchAdjustOrderData}
        />
      )}
    </Fragment>
  ) : (
    <View>
      <Text>Loading data...</Text>
    </View>
  );
}
