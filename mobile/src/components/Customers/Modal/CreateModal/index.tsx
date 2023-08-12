import { useState } from "react";
import { Alert } from "react-native";

import { database } from "../../../../database/database";

import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import CreateModalIcon from "../../../../assets/icons/add-icon-with-border.svg";
import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import PhoneIcon from "../../../../assets/icons/phone-icon-filled.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { Input } from "../../../shared/Input";
import { useAppContext } from "../../../../hooks/useAppContext";
import { ModalAction } from "../../../shared/ModalTemplate/parts/ModalAction";

interface Props {
  callback: (customerId: number) => void;
}

export function CreateModal({ callback }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { closeModal } = useAppContext();

  function createNewCustomer() {
    if (name.trim() === "" || phone.trim() === "") {
      return Alert.alert(
        "Erro no cadastro",
        "Todos os campos devem ser preenchidos!"
      );
    }

    database.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO customers (name, phone) VALUES (?, ?);",
        [name, phone],
        (_, resultSet) => {
          if (resultSet.rowsAffected !== 1) {
            return Alert.alert(
              "Erro no cadastro",
              "Não foi possível cadastrar o cliente! Tente novamente."
            );
          }

          Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
          callback(resultSet.insertId as number);
          closeModal();
        }
      );
    });
  }

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.BLUE}
        icon={CreateModalIcon}
      />

      <ModalTemplate.Container title="Cadastrar cliente">
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
            placeholder="Telefone"
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
          <ModalAction
            text="Cadastrar"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.BLUE }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            onPress={createNewCustomer}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
