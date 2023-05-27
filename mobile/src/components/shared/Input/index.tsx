import { ReactNode, useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableHighlight,
    View,
    PixelRatio
} from "react-native";

import { styles } from "./styles";
import OpenEyeIcon from "../../../assets/icons/open-eye-icon.svg";
import CloseEyeIcon from "../../../assets/icons/close-eye-icon.svg";

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

    const pixelDensity = PixelRatio.get();

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
                            <OpenEyeIcon
                                width={70 * 1 / pixelDensity}
                                height={70 * 1 / pixelDensity}
                            />
                        ) : (
                            <CloseEyeIcon
                                width={65 * 1 / pixelDensity}
                                height={65 * 1 / pixelDensity}
                            />
                        )}
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
}
