import { Text, View, Image, TouchableOpacity } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { styles } from "./styles";

import FeatherIcons from "@expo/vector-icons/Feather";
import ImageExample from "../../assets/Image_example.png";

export function Orders({
    navigation,
}: BottomTabScreenProps<ParamListBase, string, "orders">) {

    function handleToggleDrawer() {
        // navigation.toggleDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <FeatherIcons
                        name="menu"
                        color="#FFFFFF"
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.navigatorText}>Pedidos</Text>
                <TouchableOpacity>
                    <FeatherIcons
                        name="search"
                        color="#FFFFFF"
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.sectionBar}>
                <View>
                    <Text
                        style={[styles.sectionBarText, styles.sectionBarNumber]}
                    >
                        0
                    </Text>
                    <Text style={styles.sectionBarText}>Pendente</Text>
                </View>

                <View>
                    <Text
                        style={[styles.sectionBarText, styles.sectionBarNumber]}
                    >
                        0
                    </Text>
                    <Text style={styles.sectionBarText}>Finalizado</Text>
                </View>
            </View>

            <View>
                <View style={styles.listServices}>
                    <Image source={ImageExample} />
                    <View style={styles.listServicesTextGroup}>
                        <Text style={styles.listServicesText}>Nome</Text>
                        <Text style={styles.listServicesText}>
                            Tipo serviço
                        </Text>
                        <Text style={styles.listServicesText}>
                            Data entrega
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerAddButton}>
                    <Text style={styles.footerAddButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
