import { Fragment } from "react";
import { Text } from "react-native";

import { useAdjustOrderDetailViewController } from "../../../../view-controllers/Order/useAdjustOrderDetailViewController";

import { DetailMode } from "./DetailMode";
import { EditMode } from "./EditMode";

interface Props {
  orderId: number;
}

export function AdjustOrderDetail({ orderId }: Props) {
  const viewController = useAdjustOrderDetailViewController({ orderId });

  return viewController.adjustOrder ? (
    <Fragment>
      {viewController.mode === "detail" ? (
        <DetailMode controller={viewController} />
      ) : (
        <EditMode controller={viewController} />
      )}
    </Fragment>
  ) : (
    <Text>Loading data...</Text>
  );
}
