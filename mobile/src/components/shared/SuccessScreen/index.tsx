import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import FeatherIcons from "@expo/vector-icons/Feather";


import { styles } from "./styles";

interface Props {
    headerMessage?: string;
    successMessage?: string;
    buttonMessage?: string;
    returnTo?: string;
}

interface Params
    extends NativeStackScreenProps<ParamListBase, "successScreen"> {}

export function SuccessScreen({ navigation, route }: Params) {
    const routeParams = route.params as Props;

    function handleGoBack() {
        if (routeParams.returnTo) {
            navigation.navigate(routeParams.returnTo);
        } else {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <Text style={styles.navigatorText}>
                    {routeParams.headerMessage}
                </Text>
            </View>

            <View style={styles.content}>
                <FeatherIcons
                        name="check-circle"
                        size={120}
                        color="#00B407"
                />
                <Text style={styles.successMessage}>
                    {routeParams.successMessage}
                </Text>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={handleGoBack}
                >
                    <FeatherIcons
                        name="arrow-left"
                        color="#FFF"
                        size={20}
                    />
                    <Text style={styles.buttonText}>
                        {routeParams.buttonMessage}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
