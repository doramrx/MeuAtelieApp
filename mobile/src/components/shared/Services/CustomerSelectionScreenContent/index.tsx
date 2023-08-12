import { Fragment, useCallback, useState } from "react";
import { Text, TouchableHighlight } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { useAppContext } from "../../../../hooks/useAppContext";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import SearchIcon from "../../../../assets/icons/search-icon.svg";

import { Input } from "../../Input";
import { Modal } from "../../../Customers/Modal";
import { CustomerProps } from "../../../Customers/Card";
import { RadioGroup } from "../../../Orders/TailoredClothService/RadioGroup";

interface Props {
  title: string;
}

export function CustomerSelectionScreenContent({ title }: Props) {
  const { isModalOpen, openModal } = useAppContext();

  const [customers, setCustomers] = useState<CustomerProps[]>([]);

  function handleOpenModal() {
    openModal("Create");
  }

  function fetchCustomers() {
    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT id, name, phone FROM customers;",
        undefined,
        (_, resultSet) => {
          const customerList = resultSet.rows._array.map((rawCustomerData) => {
            return {
              customerId: rawCustomerData.id,
              customerName: rawCustomerData.name,
              customerPhone: rawCustomerData.phone,
            };
          });
          setCustomers(customerList);
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  return (
    <Fragment>
      <Text style={styles.title}>{title}</Text>

      <TouchableHighlight
        style={styles.button}
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={handleOpenModal}
      >
        <Text style={styles.textButton}>Cadastrar novo cliente</Text>
      </TouchableHighlight>

      <Text style={[styles.text, { marginBottom: 8 }]}>ou</Text>

      <Text style={styles.text}>Selecionar um cliente existente</Text>

      <Input
        icon={SearchIcon}
        placeholder="Pesquisar por um cliente"
        containerStyles={styles.input}
      />

      <RadioGroup
        customerData={customers}
        containerStyles={styles.customerList}
      />

      {isModalOpen && (
        <Modal
          callback={() => {
            // Todo
          }}
        />
      )}
    </Fragment>
  );
}
