import { Text, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import UserIconFilled from "../../../assets/icons/user-icon-filled.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

interface Props {
    dressmakerId: number;
    dressmakerName: string;
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
                <Text style={styles.dressmakersName}>
                    {props.dressmakerName}
                </Text>
            </View>
            <TouchableWithoutFeedback
                onPress={() => props.onOptionsClick(props.dressmakerId)}
            >
                <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
            </TouchableWithoutFeedback>
        </View>
    );
}
