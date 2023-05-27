import { Text, View } from "react-native";
import { styles } from "./styles";

import { THEME } from "../../../theme";
import MeasuringTapeIcon from "../../../assets/icons/measuring-tape-icon.svg";
import NeedleAndThreadIcon from "../../../assets/icons/needle-and-thread-icon.svg";
import VerticalMoreIcon from "../../../assets/icons/vertical-more-icon.svg";

interface Props {
    title: string;
    type: "RepairOrAdjust" | "Tailored";
    dueDate: Date;
    marginBottom?: number;
}

export function Card(props: Props) {
    return (
        <View style={[styles.container, { marginBottom: props.marginBottom }]}>
            <View style={styles.wrapper}>
                <View style={styles.iconContainer}>
                    {props.type === "RepairOrAdjust" ? (
                        <NeedleAndThreadIcon
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    ) : (
                        <MeasuringTapeIcon
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    )}
                </View>

                <View>
                    <Text style={styles.orderTitle}>{props.title}</Text>
                    <Text style={styles.orderType}>
                        {props.type === "RepairOrAdjust"
                            ? "Tipo Serviço: Ajuste ou Conserto"
                            : "Tipo Serviço: Roupa sob medida"}
                    </Text>
                    <Text style={styles.orderDueDate}>
                        {`${String(props.dueDate.getDate()).padStart(
                            2,
                            "0"
                        )}/${String(props.dueDate.getMonth() + 1).padStart(
                            2,
                            "0"
                        )}/${props.dueDate.getFullYear()}`}
                    </Text>
                </View>
            </View>
            <VerticalMoreIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
        </View>
    );
}
