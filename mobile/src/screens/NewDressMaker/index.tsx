import { DrawerScreenProps } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { styles } from "./styles";

export function NewDressMaker({
    navigation,
}: DrawerScreenProps<ParamListBase, string, "listDressMakers">) {
    function handleToggleDrawer() {
        navigation.goBack();
    }

    function handleRegisterNewDressMaker() {
        // Save dressmaker into database
        navigation.navigate("successScreen", {
            headerMessage: "Cadastro de costureira",
            successMessage: "Costureira cadastrada com sucesso!",
            buttonMessage: "Retornar a listagem",
            returnTo: "listDressMakers",
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <TouchableOpacity onPress={handleToggleDrawer}>
                    <Icon
                        name="arrow-left"
                        color="#FFF"
                        size={24}
                    />
                </TouchableOpacity>
                <Text style={styles.navigatorText}>Cadastrar costureira</Text>
            </View>

            <Text style={styles.title}>Costureira</Text>
            <View style={styles.dressMakerForm}>
                <TextInput
                    placeholder="Nome"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Telefone"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegisterNewDressMaker}
                >
                    <Icon
                        name="plus"
                        size={20}
                        color="#FFF"
                    />
                    <Text style={styles.buttonText}>Adicionar perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
