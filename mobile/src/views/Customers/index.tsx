import { useCallback, useState } from "react";
import { Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../database/database";

import { useAppContext } from "../../hooks/useAppContext";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";

import { Card } from "../../components/Customers/Card/index";
import { BottomModal } from "../../components/shared/BottomModal";
import { Screen } from "../../components/shared/Screen";
import { Modal } from "../../components/Customers/Modal";

interface Customer {
  id: number;
  name: string;
  phone: string;
}

export function Customers() {
  const PAGINATION_LIMIT = 20;

  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState(-1);

  const {
    isModalOpen,
    openModal,
    openBottomModal: openBottomModalCtx,
    closeBottomModal,
    isBottomModalOpen,
    modalType,
  } = useAppContext();

  function openBottomModal(id: number) {
    setCustomerId(id);
    openBottomModalCtx();
  }

  function handleOpenDetailsModal() {
    openModal("Detail");
  }

  function handleOpenEditModal() {
    openModal("Edit");
  }

  function handleOpenCreateCustomerModal() {
    openModal("Create");
  }

  function handleOpenDeleteModal() {
    Alert.alert("Confirmação", "Deseja realmente deletar este cliente?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          database.transaction((transaction) => {
            transaction.executeSql(
              "DELETE FROM customers WHERE id = ?;",
              [customerId],
              (_, resultSet) => {
                if (resultSet.rowsAffected !== 1) {
                  Alert.alert(
                    "Erro na exclusão",
                    "Não foi possível excluir o cliente selecionado! Tente novamente"
                  );
                } else {
                  Alert.alert("Sucesso", "Cliente excluído com sucesso!");

                  try {
                    setCustomers((current) =>
                      current.filter((customer) => customer.id !== customerId)
                    );

                    closeBottomModal();
                  } catch (error) {
                    Alert.alert(
                      "Erro na exclusão",
                      "Não foi possível excluir o cliente selecionado! Tente novamente"
                    );
                  }
                }
              }
            );
          });
        },
      },
    ]);
  }

  function fetchCustomers() {
    const offset = (currentPage - 1) * PAGINATION_LIMIT;

    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM customers LIMIT ${PAGINATION_LIMIT} OFFSET ${offset};`,
        undefined,
        (_, resultSet) => {
          const customerList: Customer[] = resultSet.rows._array.map(
            (customer) => {
              return {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
              };
            }
          );

          if (customerList.length !== 0) {
            setCustomers((prevCustomers) => {
              return [...prevCustomers, ...customerList];
            });
          }
        }
      );
    });
  }

  function performListUpdate(affectedCustomerId: number) {
    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT id, name, phone FROM customers WHERE id = ?;",
        [affectedCustomerId],
        (_, resultSet) => {
          if (resultSet.rows.length === 0) {
            return;
          }

          const customerData: Customer = {
            id: resultSet.rows.item(0).id,
            name: resultSet.rows.item(0).name,
            phone: resultSet.rows.item(0).phone,
          };

          if (modalType === "Create") {
            // Um novo cliente foi cadastrado
            // baixar os dados dele e inserir na lista!
            setCustomers((prevCustomers) => {
              return [...prevCustomers, customerData];
            });
          } else {
            // O cliente foi atualizado
            // baixar os dados do cliente e atualizar na lista!
            const customersCopy = [...customers];
            const index = customersCopy.findIndex(
              (customer) => customer.id === customerData.id
            );

            if (index !== -1) {
              customersCopy[index] = customerData;
              setCustomers(() => customersCopy);
            }
          }
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [currentPage])
  );

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity
          onPress={handleOpenCreateCustomerModal}
          style={styles.addButton}
        >
          <AddIcon
            width={18}
            color={THEME.COLORS.WHITE.FULL_WHITE}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={customers}
          renderItem={({ item, index }) => {
            return index < customers.length ? (
              <Card
                key={item.id}
                customerId={item.id}
                customerName={item.name}
                customerPhone={item.phone}
                onOptionsClick={openBottomModal}
                containerStyle={{ marginBottom: 6 }}
              />
            ) : (
              <Card
                key={item.id}
                customerId={item.id}
                customerName={item.name}
                customerPhone={item.phone}
                onOptionsClick={openBottomModal}
              />
            );
          }}
          onEndReached={() => {
            setCurrentPage((prevPage) => prevPage + 1);
          }}
        />
      </Screen.Content>

      {isModalOpen && (
        <Modal
          customerId={customerId}
          callback={performListUpdate}
        />
      )}

      {isBottomModalOpen && (
        <BottomModal
          onDetailOption={handleOpenDetailsModal}
          onEditOption={handleOpenEditModal}
          onDeleteOption={handleOpenDeleteModal}
          onCloseModal={closeBottomModal}
        />
      )}
    </Screen.Root>
  );
}
