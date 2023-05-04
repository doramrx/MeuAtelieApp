import { Text, View, TouchableOpacity } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";

import { Card } from "../../components/Orders/Card";
import { Options } from "../../components/Orders/Options";

export function Orders() {
    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <Text style={styles.title}>Pedidos</Text>
                <TouchableOpacity style={styles.addButton}>
                    <AddIcon width={18} />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <Options />
                <Text style={styles.listCounter}>
                    2 Pedidos listados
                </Text>
                <Card
                    title="Calça jeans Zara"
                    type="RepairOrAdjust"
                    dueDate={new Date()}
                    marginBottom={6}
                />
                <Card
                    title="Vestido longo preto"
                    type="Tailored"
                    dueDate={new Date()}
                />
            </View>
        </View>
    );
}

styles.container;
