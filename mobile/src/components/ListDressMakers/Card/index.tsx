import { Text, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import DressMakerProfileIcon from "../../../assets/icons/user-icon.svg";
import MoreVerticalIcon from "../../../assets/icons/more-vertical-icon.svg";

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
                <DressMakerProfileIcon />
                <Text style={styles.dressmakersName}>
                    {props.dressmakerName}
                </Text>
            </View>
            <TouchableWithoutFeedback
                onPress={() => props.onOptionsClick(props.dressmakerId)}
            >
                <MoreVerticalIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
            </TouchableWithoutFeedback>
        </View>
    );
}
