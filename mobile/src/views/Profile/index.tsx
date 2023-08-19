import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

import {
  ProfileViewControllerData,
  useProfileViewController,
} from "../../view-controllers/useProfileViewController";

import { THEME } from "../../theme";
import { styles } from "./styles";
import UserIcon from "../../assets/icons/user-icon-filled.svg";
import ProfileIcon from "../../assets/icons/user-icon-with-border.svg";
import EditIcon from "../../assets/icons/edit-icon-with-border.svg";
import PasswordIcon from "../../assets/icons/password-icon-with-border.svg";
import LogOutIcon from "../../assets/icons/logout-icon.svg";
import DeleteProfileIcon from "../../assets/icons/trash-icon.svg";

import { Screen } from "../../components/shared/Screen";
import { Button } from "../../components/Profile/Button";
import { Modal } from "../../components/Profile/Modal";

interface Props {
  controller?: () => ProfileViewControllerData;
}

export function ProfileView({ controller }: Props) {
  const viewController = controller ? controller() : useProfileViewController();

  return (
    <Screen.Root>
      <Screen.Header additionalStyles={styles.upperContainer}>
        <UserIcon
          testID="user-icon"
          width={45}
          height={45}
          color={THEME.COLORS.WHITE.FULL_WHITE}
        />

        <Text
          testID="dressmaker-name"
          style={styles.name}
        >
          {viewController.dressmakerName}
        </Text>

        <TouchableOpacity
          testID="delete-account-button"
          style={styles.trashButton}
          activeOpacity={0.6}
          onPress={viewController.onDeleteAccount}
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
          buttonTestId="view-profile-button"
          text="Visualizar perfil"
          icon={ProfileIcon}
          onItemPress={viewController.onOpenDetailModal}
        />

        <Button
          buttonTestId="edit-profile-button"
          text="Editar perfil"
          icon={EditIcon}
          onItemPress={viewController.onOpenEditModal}
        />

        <Button
          buttonTestId="edit-password-profile-button"
          text="Editar senha"
          icon={PasswordIcon}
          onItemPress={viewController.onOpenEditPasswordModal}
        />

        <View style={styles.logOutwrapper}>
          <TouchableHighlight
            testID="logout-button"
            style={styles.logOutButton}
            onPress={viewController.onLogOut}
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

      {viewController.isModalOpen && <Modal userId={viewController.userId} />}
    </Screen.Root>
  );
}
