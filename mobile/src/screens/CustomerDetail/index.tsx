import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  PixelRatio,
  StatusBar,
} from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";
import { Card } from "../../components/Orders/Card";
import EditIcon from "../../assets/icons/edit-icon.svg";
import ArrowBackIcon from "../../assets/icons/arrow-back-icon.svg";

export function CustomerDetail() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="default"
        backgroundColor={THEME.COLORS.PINK.V2}
      />
      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <ArrowBackIcon
            width={40}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes</Text>
        <TouchableOpacity style={styles.editButton}>
          <EditIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.personalDataContainer}>
          <Text style={styles.personalDataTitle}>Dados Pessoais</Text>
          <View>
            <Text style={styles.personalData}>Nome: Cliente tal </Text>
            <Text style={styles.personalData}>Telefone: (47) 99522-5523</Text>
          </View>
        </View>

        <View style={styles.orderDataContainer}>
          <Text style={styles.orderDataTitle}>Pedidos</Text>
          <Text style={styles.alternativeText}>O cliente ainda não possui pedidos</Text>
        </View>
      </View>
    </View>
  );
}