import { Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../../theme";
import UserIconFilled from "../../../assets/icons/user-icon-filled.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

interface Props {
    customerId: number;
    customerName: string;
    customerPhone: string;
    marginBottom?: number;
    onOptionsClick: (id: number) => void;
}

export function Card(props: Props) {
    return (
        <View style={[styles.container, { marginBottom: props.marginBottom }]}>
            <View style={styles.wrapper}>
                <UserIconFilled
                    color={THEME.COLORS.PINK.V1}
                />
                <View>
                    <Text style={styles.customerName}>
                        {props.customerName}
                    </Text>
                    <Text style={styles.customerPhone}>
                        {props.customerPhone}
                    </Text>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    props.onOptionsClick(props.customerId);
                }}
            >
                <VerticalMoreIcon
                    color={THEME.COLORS.GRAY.MEDIUM.V2}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}