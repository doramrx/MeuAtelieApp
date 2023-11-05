/* eslint-disable indent */
import { Linking } from "react-native";
import { AdjustOrder, OrderType, TailoredClothOrder } from "../entities/Order";

interface WhatsappNotificationFunctions {
  sendMessage: (data: OrderData) => void;
}

interface OrderData {
  order: AdjustOrder | TailoredClothOrder;
  orderType: OrderType;
}

export function useWhatsappNotification(): WhatsappNotificationFunctions {
  function sendMessage(data: OrderData) {
    const message =
      data.orderType === "adjustService"
        ? buildAdjustOrderMessage(data.order as AdjustOrder)
        : buildTailoredOrderMessage(data.order as TailoredClothOrder);

    if (!message) {
      return Promise.reject();
    }

    return Linking.openURL(`whatsapp://send?text=${message}&phone=47984156092`);
  }

  function buildAdjustOrderMessage(order: AdjustOrder): string | null {
    return `
    Olá, ${order.customer.name}!
    Seu pedido de ajuste no valor de R$ ${
      order.cost
    } foi finalizado. \n\nItens solicitados:\n${order.orderItems
      .map((item) => {
        return `\n\t${item.title}: ${item.adjusts
          .map((adjust) => {
            return `\n\t\t${adjust.description} - R$ ${adjust.cost
              .toFixed(2)
              .replace(".", ",")}`;
          })
          .join("")}\n`;
      })
      .join("")}\nVenha buscar o seu pedido no SatherAteliê! 😊
  `;
  }

  function buildTailoredOrderMessage(order: TailoredClothOrder): string {
    return `Olá, ${order.customer.name}! Seu pedido ${
      order.title
    }, no valor de R$ ${order.cost
      .toFixed(2)
      .replace(
        ".",
        ","
      )} foi finalizado. Venha buscar o seu pedido no SatherAteliê! 😊&phone=47984156092`;
  }

  return {
    sendMessage,
  };
}
