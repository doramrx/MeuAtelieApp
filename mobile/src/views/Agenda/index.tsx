import { Text, View } from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";

import { styles } from "./styles";

import {
  AgendaData,
  useAgendaViewController,
} from "../../view-controllers/useAgendaViewController";

import { Screen } from "../../components/shared/Screen";
import { OrderList } from "../../components/Agenda/OrderList";

interface Props {
  controller: () => AgendaData;
}

LocaleConfig.locales["br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ],
  dayNamesShort: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
};

LocaleConfig.defaultLocale = "br";

export function Agenda({ controller }: Props) {
  const viewController = controller ? controller() : useAgendaViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Agenda</Text>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <Calendar
            onDayPress={viewController.onSelectDay}
            onMonthChange={viewController.onMonthChange}
            markedDates={viewController.markedDates}
          />
        </View>
        <OrderList
          data={viewController.orders}
          selectedDay={viewController.selectedDay}
        />
      </Screen.Content>
    </Screen.Root>
  );
}
