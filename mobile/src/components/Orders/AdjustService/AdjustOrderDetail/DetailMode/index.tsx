import { Fragment } from "react";
import { Alert, Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";

import { AdjustOrderData } from "..";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { ExpandablePieceList } from "../../ExpandablePieceList";
import { database } from "../../../../../database/database";

interface Props {
  orderId: number;
  orderData: AdjustOrderData;
}

export function DetailMode({ orderId, orderData }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function finishOrder() {
    database?.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE orders SET delivered_at = ? WHERE id = ?;",
        [new Date().toISOString(), orderId],
        (_, resultSet) => {
          if (resultSet.rowsAffected === 1) {
            Alert.alert("Sucesso", "Pedido finalizado com sucesso!");

            // Linking.openURL(
            //   "whatsapp://send?text=te_amo_princesinha_<3&phone=47999944713"
            // )
            //   .then((something) => {
            //     console.log(something);
            //   })
            //   .catch((error) => {
            //     console.log(error);
            //   });

            navigation.navigate("orders");
          } else {
            Alert.alert("Erro", "Houve um erro ao finalizar o pedido!");
          }
        }
      );
    });
  }

  return (
    <Fragment>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>Dados do cliente</Text>

        <ClientInfo
          name={orderData.customer.name}
          phone={orderData.customer.phone}
        />

        <Text style={styles.title}>Detalhes do pedido</Text>
      </View>

      <ExpandablePieceList
        pieces={orderData.order.items.map((item) => {
          return {
            title: item.title,
            description: item.description || "",
            adjustList: item.adjusts.map((adjust) => {
              return {
                id: adjust.adjust.id,
                description: adjust.adjust.description,
                cost: adjust.cost,
                isChecked: true,
              };
            }),
          };
        })}
        mode="View"
      />

      <View style={[styles.infoWrapper, { marginVertical: 20 }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Contratado em:</Text>
          <Text style={styles.infoText}>
            {orderData.order.hiredAt.toLocaleDateString("pt-BR")}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Data de entrega:</Text>
          <Text style={styles.infoText}>
            {orderData.order.dueDate.toLocaleDateString("pt-BR")}
          </Text>
        </View>
        {orderData.order.deliveredAt && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Finalizado em:</Text>
            <Text style={styles.infoText}>
              {orderData.order.deliveredAt.toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Valor:</Text>
          <Text style={styles.infoText}>
            {`R$ ${orderData.order.cost.toFixed(2).replace(".", ",")}`}
          </Text>
        </View>
      </View>

      {!orderData.order.deliveredAt && (
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
        onPress={handleGoBack}
        style={[styles.goBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
