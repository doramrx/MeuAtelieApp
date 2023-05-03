import { Text, View } from "react-native";
import { styles } from "./styles";

import CustomerProfileIcon from "../../../assets/icons/user-icon.svg";
import MoreVerticalIcon from "../../../assets/icons/more-vertical-icon.svg";


export function Card() {
  return (
    <View style={styles.container}>

      <View style={styles.wrapper}>
        <CustomerProfileIcon />
        <View>
          <Text style={styles.customerName}>
            Cliente
          </Text>
          <Text style={styles.customerPhone}>
            (47) 9 9562-5563
          </Text>
        </View>

      </View>
      <MoreVerticalIcon />
    </View>
  )
}