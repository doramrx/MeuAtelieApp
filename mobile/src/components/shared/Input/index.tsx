import { Text, TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

interface Props extends TextInputProps {
    label: string;
}

export function Input({ label, ...rest }: Props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                {...rest}
            ></TextInput>
        </View>
    );
}
