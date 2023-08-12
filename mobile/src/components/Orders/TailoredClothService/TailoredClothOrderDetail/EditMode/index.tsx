import { Fragment, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { database } from "../../../../../database/database";

import { useAppContext } from "../../../../../hooks/useAppContext";
import { useOrderContext } from "../../../../../hooks/useOrderContext";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";
import UpdateIcon from "../../../../../assets/icons/update-icon.svg";
import CalendarIcon from "../../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../../shared/Input";
import { PhotoCard } from "../../../PhotoCard";
import { MeasureList } from "../../../MeasureList";
import { CustomerMeasureData, OrderData } from "../DetailMode";
import { MeasureListModal } from "../../MeasureListModal";

interface Props {
  orderId: number;
  orderData: OrderData;
  getOrderData: (orderData: OrderData) => void;
}

export function EditMode({
  orderId,
  orderData: _orderData,
  getOrderData,
}: Props) {
  const { openModal, isModalOpen } = useAppContext();
  const { changeMode } = useOrderContext();

  const [orderData, setOrderData] = useState<OrderData>(_orderData);

  function setTitle(title: string) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        customer: {
          ...prevState.customer,
        },
        orderItem: {
          ...prevState.orderItem,
          title,
        },
      };
    });
  }

  function setDescription(description: string) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        customer: {
          ...prevState.customer,
        },
        orderItem: {
          ...prevState.orderItem,
          description,
        },
      };
    });
  }

  function setCost(cost: string) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        customer: {
          ...prevState.customer,
        },
        orderItem: {
          ...prevState.orderItem,
          cost: Number(cost.replace(",", ".")),
        },
      };
    });
  }

  function setDueDate(date: Date) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        customer: {
          ...prevState.customer,
        },
        orderItem: {
          ...prevState.orderItem,
          dueDate: date,
        },
      };
    });
  }

  function setMeasures(measures: CustomerMeasureData[]) {
    setOrderData((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        customer: {
          ...prevState.customer,
        },
        orderItem: {
          ...prevState.orderItem,
          measures,
        },
      };
    });
  }

  function saveModifications() {
    if (!orderData) {
      return Alert.alert("Erro", "Não existem dados para serem atualizados!");
    }

    const {
      id: orderItemId,
      title,
      description,
      cost,
      dueDate,
      measures,
    } = orderData.orderItem;

    database.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE orders SET cost = ?, due_date = ? WHERE id = ?;",
        [cost, dueDate.toISOString(), orderId],
        (transaction, resultSet) => {
          if (resultSet.rowsAffected !== 1) {
            return Alert.alert("Erro", "Não foi possível atualizar o pedido!");
          }

          transaction.executeSql(
            "UPDATE order_items SET title = ?, description = ? WHERE id = ?;",
            [title, description || "", orderItemId],
            (transaction, resultSet) => {
              if (resultSet.rowsAffected !== 1) {
                return Alert.alert(
                  "Erro",
                  "Não foi possível atualizar o item do pedido!"
                );
              }

              // console.log(">>>> AQUI <<<<");

              const measuresToNotDelete = measures
                .filter((measure) => measure.orderMeasureId !== null)
                .map((measure) => measure.orderMeasureId);

              if (measuresToNotDelete.length > 0) {
                transaction.executeSql(
                  ` DELETE FROM order_customer_measures 
                    WHERE id NOT IN (${measuresToNotDelete.join(",")});`,
                  [],
                  (_, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                      // console.log("Registros deletados com sucesso!");
                    } else {
                      // console.log("Nenhuma medida foi deletada!");
                    }
                  }
                );
              }

              // Itens que serão atualizados possuem um id e um valor
              const measuresToUpdate = measures
                .filter((measure) => measure.orderMeasureId !== null)
                .map((measure) => {
                  return {
                    value: Number(measure.value.replace(",", ".")),
                    orderMeasureId: measure.orderMeasureId,
                  };
                });

              if (measuresToUpdate.length > 0) {
                const updateSQLStatement = measuresToUpdate
                  .map((measure) => {
                    return `UPDATE order_customer_measures SET value = ${measure.value} WHERE id = ${measure.orderMeasureId};`;
                  })
                  .join("\n");

                transaction.executeSql(
                  updateSQLStatement,
                  undefined,
                  (_, resultSet) => {
                    if (resultSet.rowsAffected >= 1) {
                      // console.log("Medida(s) atualizada(s)!");
                    } else {
                      // console.log("Nenhuma medida foi atualizada!");
                    }
                  }
                );
              }

              const measuresToCreate = measures.filter(
                (measure) => measure.orderMeasureId === null
              );

              // console.log(measuresToCreate);

              if (measuresToCreate.length > 0) {
                const measurementSQLValues = measuresToCreate.map((measure) => {
                  return `(${measure.id}, ${orderItemId}, ${Number(
                    measure.value.replace(",", ".")
                  )})`;
                });

                // console.log(measurementSQLValues);

                transaction.executeSql(
                  `INSERT INTO order_customer_measures (id_customer_measure, id_order_item, value) 
                  VALUES ${measurementSQLValues.join(",")};`,
                  undefined,
                  (_, resultSet) => {
                    if (resultSet.insertId && resultSet.insertId > 0) {
                      // console.log("Registros inseridos com sucesso!");
                    } else {
                      // console.log("Nenhuma medida foi inserida!");
                    }
                  }
                );
              }

              Alert.alert(
                "Sucesso",
                "Os dados do pedido foram atualizados com sucesso!"
              );

              getOrderData({
                customer: {
                  ...orderData.customer,
                },
                orderItem: {
                  ...orderData.orderItem,
                },
              });

              changeMode();
            }
          );
        }
      );
    });
  }

  function openDatePicker() {
    DateTimePickerAndroid.open({
      value: orderData?.orderItem.dueDate || new Date(),
      onChange: (_, date) => {
        date && setDueDate(date);
      },
      mode: "date",
      minimumDate: new Date(),
    });
  }

  return (
    <Fragment>
      <Text style={styles.title}>Roupa sob medida</Text>

      <Text style={styles.subtitle}>Detalhes da peça</Text>

      <Input
        placeholder="Título da peça"
        containerStyles={styles.input}
        value={orderData.orderItem.title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Descrição (opcional)"
        style={styles.textarea}
        multiline={true}
        value={orderData.orderItem.description}
        onChangeText={setDescription}
      />

      <Text style={styles.text}>Adicionar fotos do modelo (opcional)</Text>

      <View style={styles.photoContainer}>
        <PhotoCard
          index={0}
          total={3}
        />
      </View>

      <Text style={styles.text}>
        {orderData.orderItem.measures.length === 0
          ? "Adicionar medidas do cliente (opcional)"
          : "Atualizar medidas do cliente (opcional)"}
      </Text>

      <MeasureList
        containerStyles={{ marginTop: 20 }}
        data={orderData.orderItem.measures}
        editable={false}
      />

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
        onPress={() => {
          openModal("MeasureList");
        }}
        style={[styles.button, styles.updateMeasurementsButton]}
      >
        <View style={styles.updateMeasurementsContent}>
          <UpdateIcon
            color={THEME.COLORS.GRAY.MEDIUM.V1}
            width={20}
            height={20}
          />
          <Text style={styles.measuresText}>
            {orderData.orderItem.measures.length === 0
              ? "Adicionar medidas"
              : "Atualizar medidas"}
          </Text>
        </View>
      </TouchableHighlight>

      <View style={styles.serviceCostWrapper}>
        <Text style={styles.serviceCostlabel}>Custo do serviço:</Text>
        <Input
          placeholder="R$ 00,0"
          maxLength={8}
          keyboardType="numeric"
          value={String(orderData.orderItem.cost)}
          onChangeText={(text) => {
            const typedText = text.charAt(text.length - 1);
            const commaCountInText = (text.match(/,/g) || []).length;
            const dotCountInText = (text.match(/\./g) || []).length;

            if (commaCountInText >= 1 && dotCountInText >= 1) {
              return;
            }

            if (
              (typedText === "." && dotCountInText > 1) ||
              (typedText === "," && commaCountInText > 1)
            ) {
              return;
            }

            if (
              text.length === 1 &&
              commaCountInText === 1 &&
              typedText === ","
            ) {
              return setCost("0,");
            }

            if (
              text.length === 1 &&
              dotCountInText === 1 &&
              typedText === "."
            ) {
              return setCost("0.");
            }

            if (commaCountInText <= 1 || dotCountInText <= 1) {
              return setCost(text);
            }
          }}
        />
      </View>

      <View style={styles.dueDateWrapper}>
        <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>
        <Pressable
          style={styles.dueDatePicker}
          onPress={openDatePicker}
        >
          <Text style={styles.dueDateValue}>
            {orderData.orderItem.dueDate.toLocaleDateString("pt-BR")}
          </Text>
          <CalendarIcon
            width={22}
            height={22}
            color={THEME.COLORS.GRAY.LIGHT.V1}
          />
        </Pressable>
      </View>

      <Text style={styles.serviceCountForDueDateText}>
        * Existem 6 serviços para serem entregues nesta data!
      </Text>

      <TouchableHighlight
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={saveModifications}
        style={[styles.saveOrderButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.saveOrderText]}>
          Salvar alterações
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={changeMode}
        style={[styles.cancelButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
      </TouchableHighlight>

      {isModalOpen && (
        <MeasureListModal
          customerMeasures={orderData.orderItem.measures}
          getMeasures={setMeasures}
        />
      )}
    </Fragment>
  );
}
