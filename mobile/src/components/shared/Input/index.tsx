import { ReactNode, useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableHighlight,
    View,
} from "react-native";

import { styles } from "./styles";
import OpenedEyeIcon from "../../../assets/icons/opened-eye-icon.svg";
import ClosedEyeIcon from "../../../assets/icons/closed-eye-icon.svg";

interface Props extends TextInputProps {
    leftIcon?: ReactNode;
    isPasswordInput?: boolean;
    marginBottom?: number;
}

export function Input({
    leftIcon,
    isPasswordInput = false,
    marginBottom = 0,
    ...rest
}: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <View
            style={[
                {
                    marginBottom: marginBottom,
                },
            ]}
        >
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <TextInput
                style={[
                    styles.input,
                    isPasswordInput && {
                        paddingRight: 56,
                    },
                ]}
                secureTextEntry={isPasswordInput && isPasswordVisible}
                {...rest}
            />
            {isPasswordInput && (
                <View style={styles.passwordButtonWrapper}>
                    <TouchableHighlight
                        onPress={togglePasswordVisibility}
                        underlayColor="none"
                    >
                        {!isPasswordVisible ? (
                            <OpenedEyeIcon
                                width={30}
                                height={30}
                            />
                        ) : (
                            <ClosedEyeIcon
                                width={30}
                                height={30}
                            />
                        )}
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
}
