import { ElementType, useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View,
  PixelRatio,
  ViewStyle,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

import OpenEyeIcon from "../../../assets/icons/open-eye-icon.svg";
import CloseEyeIcon from "../../../assets/icons/close-eye-icon.svg";

interface Props extends TextInputProps {
  icon?: ElementType;
  containerStyles?: ViewStyle;
  isPasswordInput?: boolean;
}

export function Input({
  containerStyles,
  icon: Icon,
  isPasswordInput = false,
  ...rest
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const pixelDensity = PixelRatio.get();

  return (
    <View style={containerStyles}>
      {Icon && (
        <View style={styles.leftIcon}>
          <Icon
            width={(70 * 1) / pixelDensity}
            height={(70 * 1) / pixelDensity}
            color={THEME.COLORS.GRAY.MEDIUM.V2}
          />
        </View>
      )}
      <TextInput
        style={[
          styles.input,
          isPasswordInput && {
            paddingRight: 56,
          },
          Icon && { paddingLeft: 56 },
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
                color={THEME.COLORS.GRAY.MEDIUM.V2}
              />
            ) : (
              <CloseEyeIcon
                width={(65 * 1) / pixelDensity}
                height={(65 * 1) / pixelDensity}
                color={THEME.COLORS.GRAY.MEDIUM.V2}
              />
            )}
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}
