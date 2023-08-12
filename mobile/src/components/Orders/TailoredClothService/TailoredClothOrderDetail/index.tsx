import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { useOrderContext } from "../../../../hooks/useOrderContext";

import { DetailMode, OrderData, CustomerMeasureData } from "./DetailMode";
import { EditMode } from "./EditMode";

interface Props {
  orderId: number;
}

export function TailoredClothOrderDetail({ orderId }: Props) {
  const { mode } = useOrderContext();

  const [orderData, setOrderData] = useState<OrderData>();

  function fetchOrder() {
    database.transaction(
      (transaction) => {
        transaction.executeSql(
          `
          SELECT 
            (ord.cost) order_cost,
            (ord.due_date) order_due_date,
            (ord.created_at) order_hired_at,
            (csm.id) customer_id,
            (csm.name) customer_name,
            (csm.phone) customer_phone,
            (ord_it.id) order_item_id,
            (ord_it.title) order_item_title,
            (ord_it.description) order_item_description,
            (csm_mea.id) customer_measure_id,
            (csm_mea.measure) customer_measure_name,
            (ord_csm_mea.value) customer_measure_value,
            (ord_csm_mea.id) order_customer_measure_id
          FROM orders ord
          JOIN order_items ord_it
            ON ord.id = ord_it.id_order
          JOIN customers as csm
            ON ord.id_customer = csm.id
          LEFT OUTER JOIN order_customer_measures ord_csm_mea
            ON ord_csm_mea.id_order_item = ord_it.id
          LEFT OUTER JOIN customer_measures csm_mea
            ON csm_mea.id = ord_csm_mea.id_customer_measure
          WHERE ord.id = ?;
        `,
          [orderId],
          (_, resultSet) => {
            if (resultSet.rows.length > 0) {
              const fetchedMeasures: CustomerMeasureData[] =
                resultSet.rows.item(0).customer_measure_id
                  ? resultSet.rows._array.map((rawData) => {
                    return {
                      orderMeasureId: rawData.order_customer_measure_id,
                      id: rawData.customer_measure_id,
                      name: rawData.customer_measure_name,
                      value: String(rawData.customer_measure_value),
                    };
                  })
                  : [];

              setOrderData({
                customer: {
                  name: resultSet.rows.item(0).customer_name,
                  phone: resultSet.rows.item(0).customer_phone,
                },
                orderItem: {
                  id: resultSet.rows.item(0).order_item_id,
                  title: resultSet.rows.item(0).order_item_title,
                  description: resultSet.rows.item(0).order_item_description,
                  cost: resultSet.rows.item(0).order_cost,
                  hiredAt: new Date(resultSet.rows.item(0).order_hired_at),
                  dueDate: new Date(resultSet.rows.item(0).order_due_date),
                  measures: fetchedMeasures,
                },
              });
            }
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, [])
  );

  return orderData ? (
    <View style={{ paddingHorizontal: 25 }}>
      {mode === "detail" ? (
        <DetailMode orderData={orderData} />
      ) : (
        <EditMode
          orderId={orderId}
          orderData={orderData}
          getOrderData={setOrderData}
        />
      )}
    </View>
  ) : (
    <View>
      <Text>Loading data...</Text>
    </View>
  );
}
