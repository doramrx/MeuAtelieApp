import { useAppContext } from "../../../hooks/useAppContext";

import { DetailModal } from "./DetailModal";
import { EditPasswordModal } from "./EditPasswordModal";
import { EditProfileModal } from "./EditProfileModal";

interface Props {
  userId: number;
}

export function Modal({ userId }: Props) {
  const { modalType } = useAppContext();

  if (modalType === "Detail") {
    return <DetailModal userId={userId} />;
  } else if (modalType === "Edit") {
    return <EditProfileModal userId={userId} />;
  } else if (modalType === "EditPassword") {
    return <EditPasswordModal userId={userId} />;
  } else {
    return null;
  }
}
