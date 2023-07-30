import { Fragment } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";

import { AdjustOrderData } from "..";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { ExpandablePieceList } from "../../ExpandablePieceList";

interface Props {
  orderData: AdjustOrderData;
}

export function DetailMode({ orderData }: Props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Valor:</Text>
          <Text style={styles.infoText}>
            {`R$ ${orderData.order.cost.toFixed(2).replace(".", ",")}`}
          </Text>
        </View>
      </View>

      <TouchableHighlight
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={() => {
          // Todo
        }}
        style={[styles.pinkButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.whiteButtonText]}>
          Mudar status
        </Text>
      </TouchableHighlight>

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
