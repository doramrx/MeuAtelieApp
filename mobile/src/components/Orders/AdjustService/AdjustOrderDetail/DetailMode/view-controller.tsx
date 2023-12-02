import { Alert } from "react-native";
import { useOrderViewModel } from "../../../../../view-models/useOrderViewModel";
import { AdjustOrder } from "../../../../../entities/Order";
import { useWhatsappNotification } from "../../../../../utils/useWhatsappNotification";
import { useNavigation } from "@react-navigation/native";

interface ViewControllerArgs {
  orderId: number;
  orderData: AdjustOrder;
}

interface ViewControllerData {
  onFinishOrder: () => void;
  onGoBack: () => void;
}

export function useViewController({
  orderId,
  orderData,
}: ViewControllerArgs): ViewControllerData {
  const orderViewModel = useOrderViewModel({ shouldFetchData: false });
  const { sendMessage } = useWhatsappNotification();
  const navigation = useNavigation();

  async function onFinishOrder() {
    try {
      await orderViewModel.finishOrder(orderId);

      Alert.alert(
        "Sucesso",
        "Pedido finalizado com sucesso!\nDeseja enviar uma mensagem de notificação para o whatsapp do cliente?",
        [
          { text: "Sim", onPress: sendWhatsappMessage },
          { text: "Cancelar", style: "cancel" },
        ]
      );
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar o pedido!");
    }
  }

  async function sendWhatsappMessage() {
    try {
      await sendMessage({
        order: orderData,
        orderType: "adjustService",
      });
    } catch (reason) {
      console.log(reason);
      Alert.alert(
        "Erro",
        "Não foi possível enviar a mensagem para o whatsapp do cliente!"
      );
    } finally {
      navigation.navigate("orders");
    }
  }

  return {
    onFinishOrder,
    onGoBack: navigation.goBack,
  };
}
