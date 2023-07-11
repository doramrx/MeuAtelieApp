import { useState } from "react";
import { Alert } from "react-native";

import { database } from "../../../../database/database";

import { useAppContext } from "../../../../hooks/useAppContext";

import { styles as modalStyles } from "../../../../components/shared/ModalTemplate/styles";
import { THEME } from "../../../../theme";
import PasswordShieldIcon from "../../../../assets/icons/shield-icon-with-border.svg";
import PasswordInputIcon from "../../../../assets/icons/password-icon-with-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { Input } from "../../../shared/Input";

interface Props {
  userId: number;
}

export function EditPasswordModal({ userId }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const { closeModal } = useAppContext();

  function changePassword() {
    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      newPasswordConfirmation.trim() === ""
    ) {
      return Alert.alert(
        "Erro ao alterar a senha",
        "Preencha todos os campos!"
      );
    }

    if (newPassword.trim() !== newPasswordConfirmation.trim()) {
      return Alert.alert(
        "Erro ao alterar a senha",
        "As duas senhas não conferem!"
      );
    }

    database.transaction((transaction) => {
      transaction.executeSql(
        "SELECT password FROM dressmakers WHERE id = ?;",
        [userId],
        (_, resultSet) => {
          const password = resultSet.rows.item(0).password;
          if (currentPassword.trim() !== password) {
            return Alert.alert(
              "Erro ao alterar a senha",
              "Senha atual inválida!"
            );
          }

          transaction.executeSql(
            "UPDATE dressmakers SET password = ? WHERE id = ?;",
            [newPassword, userId],
            (_, resultSet) => {
              if (resultSet.rowsAffected !== 1) {
                Alert.alert(
                  "Erro ao alterar a senha",
                  "Não foi possível realizar a alteração de senha!"
                );
              } else {
                Alert.alert("Sucesso", "Senha alterada com sucesso!");
                closeModal();
              }
            }
          );
        }
      );
    });
  }

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.PINK.V2}
        icon={PasswordShieldIcon}
      />

      <ModalTemplate.Container title="Alterar senha">
        <ModalTemplate.Content>
          <Input
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Senha atual"
            isPasswordInput={true}
            icon={PasswordInputIcon}
            containerStyles={{ marginBottom: 14 }}
          />
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nova senha"
            isPasswordInput={true}
            icon={PasswordInputIcon}
            containerStyles={{ marginBottom: 14 }}
          />
          <Input
            value={newPasswordConfirmation}
            onChangeText={setNewPasswordConfirmation}
            placeholder="Confirmar senha"
            isPasswordInput={true}
            icon={PasswordInputIcon}
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
            onPress={changePassword}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
