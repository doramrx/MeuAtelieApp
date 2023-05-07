import { Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
import { THEME } from "../../../theme";
import CustomerProfileIcon from "../../../assets/icons/user-icon.svg";
import MoreVerticalIcon from "../../../assets/icons/more-vertical-icon.svg";

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
                <CustomerProfileIcon />
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
                <MoreVerticalIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
            </TouchableWithoutFeedback>
        </View>
    );
}
