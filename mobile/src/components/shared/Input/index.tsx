import { ReactNode, useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableHighlight,
    View,
    PixelRatio,
    StyleSheetProperties,
} from "react-native";

import { styles } from "./styles";
import OpenEyeIcon from "../../../assets/icons/open-eye-icon.svg";
import CloseEyeIcon from "../../../assets/icons/close-eye-icon.svg";

interface Props extends TextInputProps {
    leftIcon?: ReactNode;
    containerStyles?: {};
    isPasswordInput?: boolean;
    marginBottom?: number;
}

export function Input({
    containerStyles,
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
                containerStyles && containerStyles,
            ]}
        >
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <TextInput
                style={[
                    styles.input,
                    isPasswordInput && {
                        paddingRight: 56,
                    },
                    leftIcon !== null &&
                        leftIcon !== undefined && {
                            paddingLeft: 56,
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
                                width={(70 * 1) / pixelDensity}
                                height={(70 * 1) / pixelDensity}
                            />
                        ) : (
                            <CloseEyeIcon
                                width={(65 * 1) / pixelDensity}
                                height={(65 * 1) / pixelDensity}
                            />
                        )}
                    </TouchableHighlight>
                </View>
            )}
        </View>
    );
}
