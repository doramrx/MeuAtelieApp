import {
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { THEME } from "../../../../theme";
import { styles } from "./styles";
import CalendarIcon from "../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../shared/Input";
import { ExpandableAdjustItemList } from "../ExpandableAdjustItemList";
import { AdjustOrderFormData, useViewController } from "./view-controller";

interface Props {
  controller?: () => AdjustOrderFormData;
}

export function AdjustOrderForm({ controller }: Props) {
  const viewController = controller ? controller() : useViewController();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Ajuste/conserto de roupas</Text>
        <Text style={styles.subTitle}>Adicionar detalhes da peça</Text>
        <Text style={[styles.text, styles.padBetweenComponents]}>
          Número de peças
        </Text>

        <Input
          placeholder="Quantidade"
          containerStyles={styles.padBetweenComponents}
          keyboardType="numeric"
          maxLength={5}
          value={viewController.itemAmount}
          onChangeText={viewController.onUpdateItemAmount}
          onEndEditing={viewController.onInitItems}
        />

        <View style={styles.padBetweenComponents}>
          <ExpandableAdjustItemList
            mode="Create"
            items={viewController.items}
            setTitle={viewController.onUpdateItemTitle}
            setDescription={viewController.onUpdateItemDescription}
            setAdjusts={viewController.onUpdateItemAdjust}
          />
        </View>

        <View style={styles.costContainer}>
          <Text style={styles.text}>Valor total:</Text>
          <Text style={styles.text}>R$ {viewController.onGetTotal()}</Text>
        </View>

        <View style={[styles.padBetweenComponents, { marginBottom: 20 }]}>
          <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>
          <Pressable
            style={styles.dueDatePicker}
            onPress={viewController.onOpenDateTimePicker}
          >
            <Text style={styles.dueDateValue}>
              {viewController.dueDate.toLocaleString("pt-BR")}
            </Text>
            <CalendarIcon
              width={22}
              height={22}
              color={THEME.COLORS.GRAY.LIGHT.V1}
            />
          </Pressable>
        </View>

        {/* <Text style={styles.serviceCountText}>
          * Existem 6 serviços para serem entregues nesta data!
        </Text> */}

        {/* <TouchableHighlight
          underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
          onPress={() => {
            // Todo
          }}
          style={[styles.agendaButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.agentaText]}>
            Ir para a agenda
          </Text>
        </TouchableHighlight> */}

        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={viewController.onCreateOrder}
          style={[styles.finishButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.finishText]}>
            Registrar pedido
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
