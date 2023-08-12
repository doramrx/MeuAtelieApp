import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { useAppContext } from "../../../../hooks/useAppContext";

import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import EditModalIcon from "../../../../assets/icons/edit-icon-with-border.svg";
import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import PhoneIcon from "../../../../assets/icons/phone-icon-filled.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { Input } from "../../../shared/Input";

interface Props {
  customerId: number;
  callback: (customerId: number) => void;
}

export function EditModal({ customerId, callback }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { closeModal } = useAppContext();

  function editCustomer() {
    if (name.trim() === "" || phone.trim() === "") {
      return Alert.alert(
        "Erro na edição",
        "Todos os campos devem ser preenchidos!"
      );
    }

    database.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE customers SET name = ?, phone = ? WHERE id = ?;",
        [name, phone, customerId],
        (_, resultSet) => {
          if (resultSet.rowsAffected !== 1) {
            return Alert.alert(
              "Erro na edição",
              "Não foi possível editar os dados do cliente! Tente novamente."
            );
          }
          Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
          callback(customerId);
          closeModal();
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      database.transaction((transaction) => {
        transaction.executeSql(
          "SELECT name, phone FROM customers WHERE id = ?;",
          [customerId],
          (_, resultSet) => {
            setName(resultSet.rows.item(0).name);
            setPhone(resultSet.rows.item(0).phone);
          }
        );
      });
    }, [])
  );

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.PINK.V2}
        icon={EditModalIcon}
      />
      <ModalTemplate.Container title="Editar">
        <ModalTemplate.Content>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            icon={UserIcon}
            containerStyles={{ marginBottom: 14 }}
          />
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="Email"
            icon={PhoneIcon}
            containerStyles={{ marginBottom: 14 }}
          />
        </ModalTemplate.Content>
        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Fechar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={closeModal}
          />
          <ModalTemplate.Action
            text="OK"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.PINK.V2 }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            onPress={editCustomer}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
