import { Text, View } from "react-native";
import { styles } from "./styles";

import { THEME } from "../../../theme";
import TailoredClothesServiceIcon from "../../../assets/icons/tailored_clothes_service_icon.svg";
import ClothingRepairOrAdjustServiceIcon from "../../../assets/icons/clothing_repair_or_adjust_service.svg";
import MoreVerticalIcon from "../../../assets/icons/more-vertical-icon.svg";

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
            <ClothingRepairOrAdjustServiceIcon
              color={THEME.COLORS.WHITE.FULL_WHITE}
            />
          ) : (
            <TailoredClothesServiceIcon
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
      <MoreVerticalIcon color={THEME.COLORS.GRAY.MEDIUM.V2} />
    </View>
  );
}
