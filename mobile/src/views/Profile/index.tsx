import { useCallback, useContext, useState } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { database } from "../../database/database";

import { AuthContext } from "../../contexts/AuthContext";
import { useAppContext } from "../../hooks/useAppContext";

import { THEME } from "../../theme";
import { styles } from "./styles";
import UserIcon from "../../assets/icons/user-icon-filled.svg";
import ProfileIcon from "../../assets/icons/user-icon-with-border.svg";
import EditIcon from "../../assets/icons/edit-icon-with-border.svg";
import PasswordIcon from "../../assets/icons/password-icon-with-border.svg";
import LogOutIcon from "../../assets/icons/logout-icon.svg";
import DeleteProfileIcon from "../../assets/icons/trash-icon.svg";

import { Button } from "../../components/Profile/Button";
import { Screen } from "../../components/shared/Screen";
import { Modal } from "../../components/Profile/Modal";

export function Profile() {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  const { userId, setSetUserId } = useContext(AuthContext);
  const { openModal, isModalOpen, closeModal } = useAppContext();

  function handleOpenDetails() {
    openModal("Detail");
  }

  function handleOpenEdit() {
    openModal("Edit");
  }

  function handleOpenEditPassword() {
    openModal("EditPassword");
  }

  function handleLogOut() {
    setSetUserId(null);
    navigation.navigate("inaugural");
  }

  function handleDeleteAccount() {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir a sua conta? Todos os serviços realizados também serão excluídos no processo.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            database.transaction((transaction) => {
              transaction.executeSql(
                "DELETE FROM dressmakers WHERE id = ?;",
                [userId],
                (_, resultSet) => {
                  // console.log(resultSet);

                  if (resultSet.rowsAffected !== 1) {
                    Alert.alert(
                      "Erro ao deletar o perfil",
                      "Não foi possível deletar o perfil! Tente novamente."
                    );
                  } else {
                    Alert.alert(
                      "Sucesso",
                      "O seu perfil foi deletado com sucesso!"
                    );
                    navigation.navigate("signIn");
                  }
                }
              );
            });
          },
          style: "default",
        },
      ]
    );
  }

  useFocusEffect(
    useCallback(() => {
      database.transaction((transaction) => {
        transaction.executeSql(
          "SELECT name FROM dressmakers WHERE id = ?;",
          [userId],
          (_, resultSet) => {
            setName(resultSet.rows.item(0).name);
          }
        );
      });
    }, [closeModal])
  );

  useFocusEffect(
    useCallback(() => {
      if (!userId) {
        navigation.navigate("inaugural");
      }
    }, [])
  );

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <UserIcon
          width={45}
          height={45}
          color={THEME.COLORS.WHITE.FULL_WHITE}
        />

        <Text style={styles.name}>{name}</Text>

        <TouchableOpacity
          style={styles.trashButton}
          activeOpacity={0.6}
          onPress={handleDeleteAccount}
        >
          <DeleteProfileIcon
            color={THEME.COLORS.WHITE.FULL_WHITE}
            width={22}
            height={22}
          />
        </TouchableOpacity>
      </Screen.Header>

      <Screen.Content additionalStyles={styles.mainContainer}>
        <Button
          text="Visualizar perfil"
          icon={ProfileIcon}
          onItemPress={handleOpenDetails}
        />

        <Button
          text="Editar perfil"
          icon={EditIcon}
          onItemPress={handleOpenEdit}
        />

        <Button
          text="Editar senha"
          icon={PasswordIcon}
          onItemPress={handleOpenEditPassword}
        />

        <View style={styles.logOutwrapper}>
          <TouchableHighlight
            style={styles.logOutButton}
            onPress={handleLogOut}
            activeOpacity={0.9}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
          >
            <View style={styles.logOutButtonWrapper}>
              <LogOutIcon
                width={22}
                height={22}
                color={THEME.COLORS.GRAY.DARK.V1}
              />

              <Text style={styles.buttonText}>Sair</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Screen.Content>

      {isModalOpen && <Modal userId={userId as number} />}
    </Screen.Root>
  );
}
