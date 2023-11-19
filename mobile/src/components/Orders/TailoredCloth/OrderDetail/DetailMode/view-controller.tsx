import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TailoredClothOrder } from "../../../../../entities/Order";
import { useOrderViewModel } from "../../../../../view-models/useOrderViewModel";
import { useWhatsappNotification } from "../../../../../utils/useWhatsappNotification";

interface Props {
  orderId: number;
  orderData: TailoredClothOrder | null;
}

interface ViewControllerData {
  onGoBack: () => void;
  onFinishOrder: () => void;
}

export function useViewController({
  orderId,
  orderData,
}: Props): ViewControllerData {
  const navigation = useNavigation();
  const { sendMessage } = useWhatsappNotification();

  const viewModel = useOrderViewModel({ shouldFetchData: false });

  async function onFinishOrder() {
    try {
      await viewModel.finishOrder(orderId);

      Alert.alert(
        "Sucesso",
        "Pedido finalizado com sucesso!\nDeseja enviar uma mensagem de notificação para o whatsapp do cliente?",
        [
          { text: "Sim", onPress: sendWhatsappMessage },
          { text: "Cancelar", style: "cancel" },
        ]
      );
    } catch {
      Alert.alert("Erro", "Houve um erro ao finalizar o pedido!");
    }
  }

  async function sendWhatsappMessage() {
    try {
      await sendMessage({
        order: orderData as TailoredClothOrder,
        orderType: "tailoredClothService",
      });
    } catch (reason) {
      Alert.alert(
        "Erro",
        "Não foi possível enviar a mensagem para o whatsapp do cliente!"
      );
    } finally {
      navigation.navigate("orders");
    }
  }

  return {
    onGoBack: navigation.goBack,
    onFinishOrder,
  };
}
