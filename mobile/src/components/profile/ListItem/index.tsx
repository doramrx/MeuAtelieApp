import { ReactNode } from "react";
import { Text, TouchableHighlight, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

interface Props {
    onItemPress: () => void;
    text: string;
    icon: ReactNode;
}

export function ListItem({ text, icon }: Props) {
    return (
        <TouchableHighlight
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            activeOpacity={0.9}
            style={styles.container}
            onPress={() => {}}
        >
            <View style={styles.contentWrapper}>
                {icon}
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
}
