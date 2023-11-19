import { Fragment } from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { THEME } from "../../../../../theme";
import { styles } from "./styles";

import { MeasureList } from "../../../MeasureList";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { PhotoCard } from "../../../PhotoCard";
import { TailoredClothOrder } from "../../../../../entities/Order";
import { useViewController } from "./view-controller";

interface Props {
  orderId: number;
  orderData: TailoredClothOrder | null;
}

export function DetailMode({ orderId, orderData }: Props) {
  const viewController = useViewController({ orderId, orderData });

  if (!orderData) {
    viewController.onGoBack();
    return (
      <View>
        <Text>Dados não carregaram!</Text>
      </View>
    );
  }

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
          onPress={viewController.onFinishOrder}
          style={[styles.pinkButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.whiteButtonText]}>
            Finalizar pedido
          </Text>
        </TouchableHighlight>
      )}

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={viewController.onGoBack}
        style={[styles.navigateBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
