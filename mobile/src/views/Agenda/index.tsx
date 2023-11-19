import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

import "../../config/reactNativeCalendars";

import { styles } from "./styles";

import {
  AgendaData,
  useAgendaViewController,
} from "../../view-controllers/useAgendaViewController";

import { Screen } from "../../components/shared/Screen";
import { OrderList } from "../../components/Agenda/OrderList";
import { Modal } from "../../components/Agenda/Modal";

interface Props {
  controller: () => AgendaData;
}

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
          onSelectOrder={viewController.onSelectOrder}
        />
      </Screen.Content>

      {viewController.isModalOpen && viewController.selectedOrder && (
        <Modal
          orderId={viewController.selectedOrder.orderId}
          orderType={viewController.selectedOrder.orderType}
          isOrderFinished={viewController.selectedOrder.finished}
          callback={viewController.onFinishOrder}
        />
      )}
    </Screen.Root>
  );
}