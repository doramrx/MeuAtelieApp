import { Dispatch, SetStateAction, useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";

import FeatherIcons from "@expo/vector-icons/Feather";

import { styles } from "./styles";

interface Props {
    label: string;
    inputValue: string;
    onInputChangeText: Dispatch<SetStateAction<string>>;
}

export function PasswordInput({ label, inputValue, onInputChangeText }: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={onInputChangeText}
                    textContentType="password"
                    placeholder="* * * * * * * *"
                    secureTextEntry={!isPasswordVisible}
                ></TextInput>

                <TouchableOpacity
                    style={styles.togglePasswordVisibilityButton}
                    onPress={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                        <FeatherIcons
                            name="eye-off"
                            size={32}
                            color="#666"
                        />
                    ) : (
                        <FeatherIcons
                            name="eye"
                            size={32}
                            color="#666"
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
