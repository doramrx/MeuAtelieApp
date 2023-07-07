import { ReactNode } from "react";
import { StatusBar, View } from "react-native";

import { styles } from "../styles";
import { THEME } from "../../../../theme";

interface Props {
    children: ReactNode;
}

export function ScreenRoot({ children }: Props) {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />
            {children}
        </View>
    );
}
