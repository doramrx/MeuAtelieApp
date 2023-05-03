import { Image, Text, TouchableHighlight, View } from "react-native";

import Logo from "../../assets/Logo.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export function Inaugural() {

    const navigation = useNavigation();

    function navigateTo(path: "signIn" | "signUp") {
        navigation.navigate(path);
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={Logo} style={styles.logoImage} />
            </View>

            <View style={styles.welcomeContainer}>
                <Text style={styles.title}>Bem vindo (a)</Text>
                <Text style={styles.message}>
                    O melhor aplicativo para organizar o seu Ateliê!
                </Text>

                <TouchableHighlight
                    style={[styles.button, styles.firstButton]}
                    underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                    activeOpacity={0.98}
                    onPress={() => {
                        navigateTo("signIn");
                    }}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                    activeOpacity={0.98}
                    onPress={() => {
                        navigateTo("signUp");
                    }}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}
