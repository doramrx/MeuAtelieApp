import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

import { styles } from "../styles";

interface Props {
    children: ReactNode;
    additionalStyles?: ViewStyle;
}

export function ScreenContent({ children, additionalStyles }: Props) {
    return <View style={[styles.content, additionalStyles]}>{children}</View>;
}
