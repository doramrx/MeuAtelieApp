import { View } from "react-native";
import { useAppContext } from "../../../hooks/useAppContext";

import { CreateModal } from "./CreateModal";
import { DetailModal } from "./DetailModal";
import { EditModal } from "./EditModal";

interface Props {
  customerId?: number;
  callback: (customerId: number) => void;
}

export function Modal({ customerId, callback }: Props) {
  const { modalType } = useAppContext();

  if (modalType === "Detail") {
    return <DetailModal customerId={customerId as number} />;
  } else if (modalType === "Edit") {
    return (
      <EditModal
        callback={callback}
        customerId={customerId as number}
      />
    );
  } else if (modalType === "Create") {
    return <CreateModal callback={callback} />;
  } else {
    return <View></View>;
  }
}
