import { Fragment } from "react";
import { Alert, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../../../theme";
import { styles } from "./styles";

import { MeasureList } from "../../../MeasureList";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { PhotoCard } from "../../../PhotoCard";
import { database } from "../../../../../database/database";
import { TailoredClothOrder } from "../../../../../entities/Order";
import { useWhatsappNotification } from "../../../../../utils/useWhatsappNotification";

interface Props {
  orderId: number;
  orderData: TailoredClothOrder | null;
}

export function DetailMode({ orderId, orderData }: Props) {
  const navigation = useNavigation();

  const { sendMessage } = useWhatsappNotification();

  function handleNavigateBack() {
    navigation.goBack();
  }

  function finishOrder() {
    database?.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE orders SET delivered_at = ? WHERE id = ?;",
        [new Date().toISOString(), orderId],
        async (_, resultSet) => {
          if (resultSet.rowsAffected === 1) {
            Alert.alert("Sucesso", "Pedido finalizado com sucesso!");

            await sendWhatsappMessage();
          } else {
            Alert.alert("Erro", "Houve um erro ao finalizar o pedido!");
          }
        }
      );
    });
  }

  async function sendWhatsappMessage() {
    Alert.alert(
      "Sucesso",
      "Pedido finalizado com sucesso!\nDeseja enviar uma mensagem de notificação para o whatsapp do cliente?",
      [
        {
          text: "Sim",
          onPress: async () => {
            try {
              await sendMessage({
                order: orderData as TailoredClothOrder,
                orderType: "tailoredClothService",
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
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  }

  if (!orderData) {
    handleNavigateBack();
    return (
      <View>
        <Text>Dados não carregaram!</Text>
      </View>
    );
  }

  console.log(orderData.measures);

  return (
    <Fragment>
      <Text style={styles.title}>Dados do cliente</Text>

      <ClientInfo
        name={orderData.customer.name}
        phone={orderData.customer.phone}
      />

      <Text style={styles.title}>Detalhes do pedido</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Título:</Text>
        <Text style={styles.infoText}>{orderData.title}</Text>
      </View>

      {orderData.description && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Descrição:</Text>
          <Text style={styles.infoText}>{orderData.description}</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Contratado em:</Text>
        <Text style={styles.infoText}>
          {orderData.createdAt.toLocaleString("pt-BR")}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Data de entrega:</Text>
        <Text style={styles.infoText}>
          {orderData.dueDate.toLocaleString("pt-BR")}
        </Text>
      </View>
      {orderData.deliveredAt && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Finalizado em:</Text>
          <Text style={styles.infoText}>
            {orderData.deliveredAt.toLocaleString("pt-BR")}
          </Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Valor:</Text>
        <Text style={styles.infoText}>
          R$ {orderData.cost.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <View style={styles.photoContainer}>
        <PhotoCard
          total={3}
          index={0}
        />
        <PhotoCard
          total={3}
          index={0}
        />
        <PhotoCard
          total={3}
          index={0}
        />
      </View>

      <Text style={styles.title}>Medidas</Text>
      {orderData.measures.length === 0 ? (
        <Text style={styles.emptyListText}>Nenhuma medida informada!</Text>
      ) : (
        <MeasureList
          data={orderData.measures}
          editable={false}
        />
      )}

      {!orderData.deliveredAt && (
        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={finishOrder}
          style={[styles.pinkButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.whiteButtonText]}>
            Finalizar pedido
          </Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={handleNavigateBack}
        style={[styles.navigateBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
