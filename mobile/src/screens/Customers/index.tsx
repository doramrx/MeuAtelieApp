import { Text, View, TouchableOpacity } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";
import { Card } from "../../components/Customers/Card/index";

export function Customers() {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.addButton}>
          <AddIcon width={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <Card />
      </View>
    </View>
  );
}
