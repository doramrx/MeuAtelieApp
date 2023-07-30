import { Fragment, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { useOrderContext } from "../../../../hooks/useOrderContext";

import { DetailMode } from "./DetailMode";
import { EditMode } from "./EditMode";
import { Text } from "react-native";

export interface AdjustData {
  orderServiceId: number | null;
  cost: number;
  adjust: {
    id: number;
    description: string;
  };
}

export interface AdjustOrderItemData {
  id: number;
  title: string;
  description?: string;
  adjusts: AdjustData[];
}

export interface AdjustOrderData {
  customer: {
    name: string;
    phone: string;
  };
  order: {
    cost: number;
    dueDate: Date;
    hiredAt: Date;
    items: AdjustOrderItemData[];
  };
}

interface Props {
  orderId: number;
}

export function AdjustOrderDetail({ orderId }: Props) {
  const { mode } = useOrderContext();

  const [orderData, setOrderData] = useState<AdjustOrderData>();

  function fetchOrder() {
    database.transaction((transaction) => {
      transaction.executeSql(
        `
        SELECT
          (ord.cost) order_cost,
          (ord.due_date) order_due_date,
          (ord.created_at) order_hired_at,
          (ord_it.id) order_item_id,
          (ord_it.title) order_item_title,
          (ord_it.description) order_item_description,
          (ord_se.id) ordered_service_id,
          (ord_se.cost) ordered_service_cost,
          (adj_se.id) adjust_service_id,
          (adj_se.description) adjust_service_description,
          (cst.name) customer_name,
          (cst.phone) customer_phone
        FROM orders ord
        JOIN customers cst ON ord.id_customer = cst.id
        JOIN order_items ord_it ON ord.id = ord_it.id_order
        JOIN ordered_services ord_se ON ord_it.id = ord_se.id_order_item
        JOIN adjust_services adj_se ON ord_se.id_adjust_service = adj_se.id
        WHERE ord.id = ?
        ORDER BY  ord_it.id ASC;
      `,
        [orderId],
        (_, resultSet) => {
          if (resultSet.rows.length === 0) {
            return;
          }

          const fetchedOrderData = {
            customer: {
              name: resultSet.rows.item(0).customer_name,
              phone: resultSet.rows.item(0).customer_phone,
            },
            order: {
              cost: resultSet.rows.item(0).order_cost,
              dueDate: new Date(resultSet.rows.item(0).order_due_date),
              hiredAt: new Date(resultSet.rows.item(0).order_hired_at),
              items: [
                {
                  id: resultSet.rows.item(0).order_item_id,
                  title: resultSet.rows.item(0).order_item_title,
                  description: resultSet.rows.item(0).order_item_description,
                  adjusts: [
                    {
                      orderServiceId: resultSet.rows.item(0).ordered_service_id,
                      cost: resultSet.rows.item(0).ordered_service_cost,
                      adjust: {
                        id: resultSet.rows.item(0).adjust_service_id,
                        description:
                          resultSet.rows.item(0).adjust_service_description,
                      },
                    },
                  ],
                },
              ],
            },
          } as AdjustOrderData;

          for (let i = 1; i < resultSet.rows.length; i++) {
            const row = resultSet.rows.item(i);
            const lastItemIndex = fetchedOrderData.order.items.length - 1;
            const lastItemId = fetchedOrderData.order.items[lastItemIndex].id;

            if (row.order_item_id === lastItemId) {
              fetchedOrderData.order.items[lastItemIndex].adjusts.push({
                orderServiceId: row.ordered_service_id,
                cost: row.ordered_service_cost,
                adjust: {
                  id: row.adjust_service_id,
                  description: row.adjust_service_description,
                },
              });
            } else {
              fetchedOrderData.order.items.push({
                id: row.order_item_id,
                title: row.order_item_title,
                description: row.order_item_description,
                adjusts: [
                  {
                    orderServiceId: row.ordered_service_id,
                    cost: row.ordered_service_cost,
                    adjust: {
                      id: row.adjust_service_id,
                      description: row.adjust_service_description,
                    },
                  },
                ],
              });
            }
          }

          setOrderData(fetchedOrderData);
          // console.log("===============================");
          // console.log(`Customer name: ${fetchedOrderData.customer.name}`);
          // console.log(`Customer phone: ${fetchedOrderData.customer.phone}`);
          // console.log(`Order id: ${orderId}`);
          // console.log(`Order cost: ${fetchedOrderData.order.cost}`);
          // console.log(`Order due date: ${fetchedOrderData.order.dueDate}`);
          // console.log(`Order hired at: ${fetchedOrderData.order.hiredAt}`);
          // console.log("=============================================");
          // fetchedOrderData.order.items.forEach((item) => {
          //   console.log(`\tOrder item id: ${item.id}`);
          //   console.log(`\tOrder item title: ${item.title}`);
          //   console.log(`\tOrder item description: ${item.description}`);
          //   console.log("\t=============================================");
          //   item.adjusts.forEach((adjust) => {
          //     console.log(`\t\tOrdered service id: ${adjust.orderServiceId}`);
          //     console.log(`\t\tOrdered service cost: ${adjust.cost}`);
          //     console.log(`\t\tAdjust id: ${adjust.adjust.id}`);
          //     console.log(
          //       `\t\tAdjust description: ${adjust.adjust.description}`
          //     );
          //     console.log("\t=============================================");
          //   });
          // });
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, [])
  );

  return orderData ? (
    <Fragment>
      {mode === "detail" ? (
        <DetailMode orderData={orderData} />
      ) : (
        <EditMode
          orderId={orderId}
          orderData={orderData}
          getOrderData={setOrderData}
        />
      )}
    </Fragment>
  ) : (
    <Text>Loading data...</Text>
  );
}
