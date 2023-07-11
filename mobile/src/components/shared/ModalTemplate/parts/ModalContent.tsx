import { ReactNode } from "react";
import { ScrollView } from "react-native";

interface Props {
  children: ReactNode;
}

export function ModalContent({ children }: Props) {
  return <ScrollView style={{ maxHeight: 380 }}>{children}</ScrollView>;
}
