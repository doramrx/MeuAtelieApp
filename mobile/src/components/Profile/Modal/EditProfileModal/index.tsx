import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { styles as modalStyles } from "../../../../components/shared/ModalTemplate/styles";
import { THEME } from "../../../../theme";
import EditModalIcon from "../../../../assets/icons/edit-icon-with-border.svg";
import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import EmailIcon from "../../../../assets/icons/email-icon-filled.svg";

import { Input } from "../../../shared/Input";
import { ModalTemplate } from "../../../shared/ModalTemplate";
import { useAppContext } from "../../../../hooks/useAppContext";

interface Props {
  userId: number;
}

export function EditProfileModal({ userId }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { closeModal } = useAppContext();

  function editDressMakers() {
    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT id FROM dressmakers WHERE email = ? AND NOT id = ?;",
        [email, userId],
        (_, resultSet) => {
          if (resultSet.rows.length !== 0) {
            return Alert.alert("Erro", "Email em uso");
          }

          transaction.executeSql(
            "UPDATE dressmakers SET name = ?, email = ? WHERE id = ?;",
            [name, email, userId],
            (_, resultSet) => {
              if (resultSet.rowsAffected !== 1) {
                return Alert.alert(
                  "Erro",
                  "Não foi possível editar os dados da costureira!"
                );
              }
              Alert.alert("Sucesso!", "Costureira atualizada com sucesso!");
              closeModal();
            }
          );
        }
      );
    });
  }

  useFocusEffect(
    useCallback(() => {
      database.transaction((transaction) => {
        transaction.executeSql(
          "SELECT name, email FROM dressmakers WHERE id = ?;",
          [userId],
          (_, resultSet) => {
            setName(resultSet.rows.item(0).name);
            setEmail(resultSet.rows.item(0).email);
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
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            icon={EmailIcon}
            containerStyles={{ marginBottom: 14 }}
          />
        </ModalTemplate.Content>

        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Cancelar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={closeModal}
          />
          <ModalTemplate.Action
            text="OK"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.PINK.V2 }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            onPress={editDressMakers}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
