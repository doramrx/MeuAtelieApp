import { StyleSheetProperties, Text, View } from "react-native";

import { styles } from "./styles";

import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import { THEME } from "../../../../theme";

interface Props {
    containerStyles?: {};
    name: string;
    phone: string;
}

export function ClientInfo(props: Props) {
    return (
        <View style={[styles.container, props.containerStyles]}>
            <UserIcon
                width={40}
                height={40}
                color={THEME.COLORS.GRAY.MEDIUM.V1}
            />
            <View style={styles.clientInfoContainer}>
                <Text style={styles.clientName}>{props.name}</Text>
                <Text style={styles.clientPhone}>{props.phone}</Text>
            </View>
        </View>
    );
}
