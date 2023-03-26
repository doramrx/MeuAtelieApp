import { ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <Text style={styles.navigatorText}>
                    {routeParams.headerMessage}
                </Text>
            </View>

            <View style={styles.content}>
                <Icon
                    style={styles.successIcon}
                    name="check"
                    size={40}
                    color="#00B407"
                />
                <Text style={styles.successMessage}>
                    {routeParams.successMessage}
                </Text>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={handleGoBack}
                >
                    <Icon
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
