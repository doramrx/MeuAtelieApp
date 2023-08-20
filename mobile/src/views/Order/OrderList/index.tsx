import { useCallback, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../database/database";

import { useAppContext } from "../../../hooks/useAppContext";

import { THEME } from "../../../theme";
import { styles } from "./styles";
import AddIcon from "../../../assets/icons/add-icon.svg";

import { Screen } from "../../../components/shared/Screen";
import { Card } from "../../../components/Orders/Card";
import { Options } from "../../../components/Orders/Options";
import { ServiceTypeModal } from "../../../components/Orders/ServiceTypeModal";

export interface OrderData {
  orderId: number;
  orderType: ServiceType;
  orderItems: Array<{
    title: string;
    dueDate: Date;
  }>;
}

export type ServiceType = "tailoredClothService" | "adjustService";

export function Orders() {
  const { openModal, isModalOpen } = useAppContext();

  const [orders, setOrders] = useState<OrderData[]>([]);

  function handleOpenModal() {
    openModal("ServiceSelection");
  }

  function fetchOrders() {
    database?.readTransaction((transaction) => {
      transaction.executeSql(
        `SELECT 
          ord.id,
          ori.title,
          ord.due_date,
          ord.type
        FROM orders AS ord
        JOIN order_items AS ori ON ori.id_order = ord.id;`,
        undefined,
        (_, resultSet) => {
          resultSet.rows._array.forEach((item) => {
            // console.log(item);
          });

          const orderList: OrderData[] = [];

          resultSet.rows._array.forEach((item) => {
            if (item.type === "Tailored") {
              orderList.push({
                orderId: item.id,
                orderType: "tailoredClothService",
                orderItems: [
                  {
                    title: item.title,
                    dueDate: new Date(item.due_date),
                  },
                ],
              });
            } else {
              if (orderList.length === 0) {
                orderList.push({
                  orderId: item.id,
                  orderType: "adjustService",
                  orderItems: [
                    {
                      title: item.title,
                      dueDate: new Date(item.due_date),
                    },
                  ],
                });

                return;
              }

              const lastIndex = orderList.length - 1;
              const previousOrderId = orderList[orderList.length - 1].orderId;

              if (previousOrderId === item.id) {
                orderList[lastIndex].orderItems.push({
                  title: item.title,
                  dueDate: new Date(item.due_date),
                });
              } else {
                orderList.push({
                  orderId: item.id,
                  orderType: "adjustService",
                  orderItems: [
                    {
                      title: item.title,
                      dueDate: new Date(item.due_date),
                    },
                  ],
                });
              }
            }
          });

          setOrders(orderList);
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Pedidos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleOpenModal}
        >
          <AddIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <Options />

        <Text style={styles.listCounter}>{orders.length} Pedidos listados</Text>

        {orders.map(({ orderId, orderType, orderItems }, index, array) => {
          // console.log(orderType);
          return array.length - 1 !== index ? (
            <Card
              key={orderId}
              orderId={orderId}
              orderItems={orderItems}
              orderType={orderType}
              marginBottom={6}
            />
          ) : (
            <Card
              key={orderId}
              orderId={orderId}
              orderItems={orderItems}
              orderType={orderType}
            />
          );
        })}
      </Screen.Content>

      {isModalOpen && <ServiceTypeModal />}
    </Screen.Root>
  );
}
