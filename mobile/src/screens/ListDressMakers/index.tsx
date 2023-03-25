import { DrawerScreenProps } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import HamburguerIcon from "../../assets/Hamburguer_icon.png";

export function ListDressMakers({
    navigation,
}: DrawerScreenProps<ParamListBase, string, "listDressMakers">) {

    function handleToggleDrawer() {
        navigation.toggleDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <Image
                        source={HamburguerIcon}
                        style={styles.navigatorIcons}
                    />
                </TouchableOpacity>
                <Text style={styles.navigatorText}>Costureiras</Text>
            </View>

            <View>
                <View style={styles.dressMakerBlock}>
                    <View style={styles.dressMakerAvatar}>
                    </View>
                    <View>
                        <Text style={styles.dressMakerName}>
                            Mariana Dantas
                        </Text>
                        <Text style={styles.dressMakerPhoneNumber}>
                            Telefone: (47) 988143-3921
                        </Text>
                    </View>
                </View>
                <View style={styles.dressMakerBlock}>
                    <View style={styles.dressMakerAvatar}>
                    </View>
                    <View>
                        <Text style={styles.dressMakerName}>
                            Mariana Dantas
                        </Text>
                        <Text style={styles.dressMakerPhoneNumber}>
                            Telefone: (47) 988143-3921
                        </Text>
                    </View>
                </View>
                <View style={styles.dressMakerBlock}>
                    <View style={styles.dressMakerAvatar}>
                    </View>
                    <View>
                        <Text style={styles.dressMakerName}>
                            Mariana Dantas
                        </Text>
                        <Text style={styles.dressMakerPhoneNumber}>
                            Telefone: (47) 988143-3921
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
