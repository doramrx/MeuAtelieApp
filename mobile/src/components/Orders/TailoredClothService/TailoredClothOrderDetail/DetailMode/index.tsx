import { Fragment } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { THEME } from "../../../../../theme";
import { styles } from "./styles";

import { MeasureList } from "../../../MeasureList";
import { ClientInfo } from "../../../OrderDetail/ClientInfo";
import { PhotoCard } from "../../../PhotoCard";

export interface CustomerMeasureData {
  orderMeasureId: number | null;
  id: number;
  name: string;
  value: string;
}

export interface OrderData {
  customer: {
    name: string;
    phone: string;
  };
  orderItem: {
    id: number;
    title: string;
    description: string;
    hiredAt: Date;
    dueDate: Date;
    cost: number;
    measures: CustomerMeasureData[];
  };
}

interface Props {
  orderData: OrderData | null;
}

export function DetailMode({ orderData }: Props) {
  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  if (!orderData) {
    handleNavigateBack();
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
        <Text style={styles.infoText}>{orderData.orderItem.title}</Text>
      </View>

      {orderData.orderItem.description && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Descrição:</Text>
          <Text style={styles.infoText}>{orderData.orderItem.description}</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Contratado em:</Text>
        <Text style={styles.infoText}>
          {orderData.orderItem.hiredAt.toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Data de entrega:</Text>
        <Text style={styles.infoText}>
          {orderData.orderItem.dueDate.toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Valor:</Text>
        <Text style={styles.infoText}>
          R$ {orderData.orderItem.cost.toFixed(2).replace(".", ",")}
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
      {orderData.orderItem.measures.length === 0 ? (
        <Text style={styles.emptyListText}>Nenhuma medida informada!</Text>
      ) : (
        <MeasureList
          data={orderData.orderItem.measures}
          editable={false}
        />
      )}

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
        onPress={handleNavigateBack}
        style={[styles.navigateBackButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.grayButtonText]}>Voltar</Text>
      </TouchableHighlight>
    </Fragment>
  );
}
