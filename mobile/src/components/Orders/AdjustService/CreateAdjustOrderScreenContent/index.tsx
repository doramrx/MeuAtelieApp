import { useCallback, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { database } from "../../../../database/database";

import { useOrderContext } from "../../../../hooks/useOrderContext";

import { THEME } from "../../../../theme";
import { styles } from "./styles";
import CalendarIcon from "../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../shared/Input";
import { ExpandablePieceList, pieceData } from "../ExpandablePieceList";
import { AdjustItemData } from "../AdjustList";

interface Service {
  id: number;
  description: string;
  cost: number;
}

export function CreateAdjustOrderScreenContent() {
  const { selectedCustomerId } = useOrderContext();
  const navigation = useNavigation();

  const [pieceAmount, setPieceAmount] = useState<number | null>(null);
  const [pieceItems, setPieceItems] = useState<pieceData[]>([]);
  const [dueDate, setDueDate] = useState(new Date());

  const services = useRef<Service[]>([]);

  function initPieceItems() {
    if (pieceItems.length < Number(pieceAmount)) {
      const data: pieceData[] = [];

      for (let i = 0; i < Number(pieceAmount) - pieceItems.length; i++) {
        data.push({
          title: "",
          description: "",
          adjustList: services.current.map((service) => {
            return {
              ...service,
              isSelected: false,
            };
          }),
        });
      }
      setPieceItems([...pieceItems, ...data]);
    } else if (pieceItems.length > Number(pieceAmount)) {
      const pieceDataCopy = [...pieceItems];
      const newPieceData = pieceDataCopy.slice(0, Number(pieceAmount));
      setPieceItems(newPieceData);
    } else {
      const data: pieceData[] = [];

      for (let i = 0; i < Number(pieceAmount); i++) {
        data.push({
          title: "",
          description: "",
          adjustList: services.current.map((service) => {
            return {
              ...service,
              isSelected: false,
            };
          }),
        });
      }
      setPieceItems(data);
    }
  }

  function fetchServices() {
    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM adjust_services;",
        undefined,
        (_, resultSet) => {
          const fetchedServices: Service[] = resultSet.rows._array.map(
            (rawData) => {
              return {
                id: rawData.id,
                description: rawData.description,
                cost: rawData.cost,
              };
            }
          );

          services.current = fetchedServices;
        }
      );
    });
  }

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

  function setTitle(title: string, index: number) {
    setPieceItems &&
      setPieceItems((prevPieces) => {
        const piecesCopy = [...prevPieces];
        piecesCopy[index].title = title;
        return piecesCopy;
      });
  }

  function setDescription(description: string, index: number) {
    setPieceItems &&
      setPieceItems((prevPieces) => {
        const piecesCopy = [...prevPieces];
        piecesCopy[index].description = description;
        return piecesCopy;
      });
  }

  function setAdjusts(adjusts: AdjustItemData[], index: number) {
    setPieceItems &&
      setPieceItems((prevPieces) => {
        const piecesCopy = [...prevPieces];
        piecesCopy[index].adjustList = adjusts;
        return piecesCopy;
      });
  }

  function finishOrder() {
    const totalCost = pieceItems.reduce((accumulator, item) => {
      const selectedServicesTotalCost = item.adjustList.reduce(
        (totalCost, adjustService) => {
          return adjustService.isChecked
            ? totalCost + adjustService.cost
            : totalCost;
        },
        0
      );

      return accumulator + selectedServicesTotalCost;
    }, 0);

    // console.log(`total cost: ${totalCost}`);

    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO orders (cost, due_date, type, created_at, id_customer) 
          VALUES (?, ?, ?, ?, ?);`,
        [
          totalCost,
          dueDate.toISOString(),
          "Adjust",
          new Date().toISOString(),
          selectedCustomerId,
        ],
        (_, resultSet) => {
          const insertedOrderId = resultSet.insertId;

          if (insertedOrderId === undefined) {
            return Alert.alert(
              "Erro",
              "Não foi possível cadastrar um novo serviço!"
            );
          }

          pieceItems.forEach((item) => {
            transaction.executeSql(
              "INSERT INTO order_items (title, description, id_order) VALUES (?, ?, ?);",
              [item.title, item.description, insertedOrderId],
              (transaction, resultSet) => {
                const insertedOrderItemId = resultSet.insertId;

                // console.log(`Order item id: ${insertedOrderItemId}`);

                if (insertedOrderItemId === undefined) {
                  return Alert.alert(
                    "Erro",
                    "Não foi possível cadastrar um novo serviço!"
                  );
                }

                const selectedAdjustServicesValueStatement = item.adjustList
                  .filter((adjustService) => adjustService.isChecked)
                  .map((adjustService) => {
                    return `(${adjustService.id}, ${insertedOrderItemId}, ${adjustService.cost})`;
                  })
                  .join(",");

                transaction.executeSql(
                  `INSERT INTO ordered_services (id_adjust_service, id_order_item, cost) VALUES ${selectedAdjustServicesValueStatement};`,
                  undefined,
                  () => {
                    Alert.alert(
                      "Sucesso",
                      "Serviço de ajuste cadastrado com sucesso!"
                    );

                    navigation.navigate("orders");
                  }
                );
              }
            );
          });
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchServices();
    }, [])
  );

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
          value={pieceAmount ? String(pieceAmount) : ""}
          onChangeText={(text) => {
            setPieceAmount(Number(text));
          }}
          onEndEditing={() => {
            initPieceItems();
          }}
        />

        <View style={styles.padBetweenComponents}>
          <ExpandablePieceList
            pieces={pieceItems}
            setTitle={setTitle}
            setDescription={setDescription}
            setAdjusts={setAdjusts}
            mode="Create"
          />
        </View>

        <View style={styles.costContainer}>
          <Text style={styles.text}>Valor total:</Text>
          <Text style={styles.text}>
            R${" "}
            {pieceItems
              .reduce((accumulator, item) => {
                const selectedServicesTotalCost = item.adjustList.reduce(
                  (totalCost, adjustService) => {
                    return adjustService.isChecked
                      ? totalCost + adjustService.cost
                      : totalCost;
                  },
                  0
                );

                return accumulator + selectedServicesTotalCost;
              }, 0)
              .toFixed(2)
              .replace(".", ",")}
          </Text>
        </View>

        <View style={styles.padBetweenComponents}>
          <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>
          <Pressable
            style={styles.dueDatePicker}
            onPress={() => openDatePicker()}
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

        <Text style={styles.serviceCountText}>
          * Existem 6 serviços para serem entregues nesta data!
        </Text>

        <TouchableHighlight
          underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
          onPress={() => {
            // Todo
          }}
          style={[styles.agendaButton, styles.button]}
        >
          <Text style={[styles.buttonText, styles.agentaText]}>
            Ir para a agenda
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
          onPress={finishOrder}
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
