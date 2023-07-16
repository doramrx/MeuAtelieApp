import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { database } from "../../../../database/database";

import { useOrderContext } from "../../../../hooks/useOrderContext";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CalendarIcon from "../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../shared/Input";
import { PhotoCard } from "../../PhotoCard";
import { CustomerMeasure, MeasureList } from "../../MeasureList";

export function CreateTailoredClothOrderScreenContent() {
  const navigation = useNavigation();
  const { selectedCustomerId } = useOrderContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [measurementList, setMeasurementList] = useState<CustomerMeasure[]>([
    { name: "Abdômen", value: null },
    { name: "Busto", value: null },
    { name: "Cintura", value: null },
    { name: "Comprimento", value: null },
    { name: "Manga", value: null },
    { name: "Ombro", value: null },
    { name: "Punho", value: null },
    { name: "Quadril", value: null },
  ]);
  const [cost, setCost] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  function openDatePicker() {
    DateTimePickerAndroid.open({
      value: dueDate,
      onChange: (_, date) => {
        date && setDueDate(date);
      },
      mode: "date",
      minimumDate: new Date(),
    });
  }

  function updateMeasureItem(index: number, newValue: string) {
    setMeasurementList((prevState) =>
      prevState.map((measure, measureIndex) => {
        return measureIndex === index
          ? {
              name: measure.name,
              value: newValue.length === 0 ? null : newValue,
            }
          : measure;
      })
    );
  }

  function finishOrder() {
    database.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO orders (cost, due_date, type, created_at, id_customer) VALUES (?, ?, ?, ?, ?);",
        [
          cost,
          dueDate.toISOString(),
          "Tailored",
          new Date().toISOString(),
          selectedCustomerId,
        ],
        (transaction, resultSet) => {
          const insertedOrderId = resultSet.insertId;

          // // console.log("Order id: " + insertedOrderId);

          if (insertedOrderId === undefined) {
            return Alert.alert(
              "Erro",
              "Não foi possível cadastrar um novo serviço!"
            );
          }

          transaction.executeSql(
            `
                        INSERT INTO order_items
                            (title, description, id_order)
                        VALUES (?, ?, ?);
                    `,
            [title, description, insertedOrderId],
            (transaction, resultSet) => {
              const insertedOrderItemId = resultSet.insertId;

              if (insertedOrderItemId === undefined) {
                return Alert.alert(
                  "Erro",
                  "Não foi possível cadastrar a peça!"
                );
              }

              const filledMeasurementList = measurementList.filter(
                (measure) => measure.value !== null
              );

              if (filledMeasurementList.length > 0) {
                const sqlValueStatement = filledMeasurementList
                  .map((measure) => {
                    const value = Number(measure.value!.replace(",", "."));
                    return `('${measure.name}', ${value}, ${insertedOrderItemId})`;
                  })
                  .join(",");

                const insertCustomerMeasuresSQLStatement = `INSERT INTO customer_measures (measure, value, id_order_item) VALUES ${sqlValueStatement};`;

                transaction.executeSql(
                  insertCustomerMeasuresSQLStatement,
                  undefined,
                  (_, resultSet) => {
                    const insertedMeasureId = resultSet.insertId;

                    if (insertedMeasureId === undefined) {
                      return Alert.alert(
                        "Erro",
                        "Não foi possível cadastrar as medidas do cliente!"
                      );
                    }

                    Alert.alert("Sucesso", "Serviço cadastrado com sucesso!");
                    navigation.navigate("orders");
                  }
                );
              }
            }
          );
        }
      );
    });
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Roupa sob medida</Text>
        <Text style={styles.text}>Adicionar detalhes da peça</Text>
        <Input
          placeholder="Título da peça"
          containerStyles={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Descrição (opcional)"
          style={styles.orderDescription}
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.optionalFieldsText}>
          Adicionar fotos do modelo (opcional)
        </Text>

        <View style={styles.photoContainer}>
          <PhotoCard
            index={0}
            total={3}
          />
        </View>

        <Text style={styles.optionalFieldsText}>
          Adicionar medidas do cliente (opcional)
        </Text>

        <MeasureList
          containerStyles={{ marginTop: 20 }}
          data={measurementList}
          updateMeasureItemFn={updateMeasureItem}
        />

        <View style={styles.serviceCostWrapper}>
          <Text style={styles.serviceCostlabel}>Custo do serviço:</Text>
          <Input
            placeholder="R$ 00,0"
            maxLength={8}
            keyboardType="numeric"
            value={cost}
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
            onPress={() => {
              openDatePicker();
            }}
          >
            <Text style={styles.dueDateValue}>
              {dueDate.toLocaleDateString("pt-BR")}
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
          underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
          onPress={() => {
            // Todo
          }}
          style={[styles.navigateToAgendaButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.navigateToAgendaText]}>
            Ir para a agenda
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={finishOrder}
          style={[styles.finishOrderButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.finishOrderText]}>
            Finalizar o pedido
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}
