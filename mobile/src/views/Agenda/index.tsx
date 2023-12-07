import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

import "../../config/reactNativeCalendars";

import { styles } from "./styles";

import { Screen } from "../../components/shared/Screen";
import { OrderList } from "../../components/Agenda/OrderList";
import { Modal } from "../../components/Agenda/Modal";
import { AgendaData, useViewController } from "./view-controller";

interface Props {
  controller: () => AgendaData;
}

export function Agenda({ controller }: Props) {
  const viewController = controller ? controller() : useViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Agenda</Text>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <View style={{ marginBottom: 25 }}>
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
