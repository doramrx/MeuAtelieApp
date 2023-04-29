import { Text, View, TouchableHighlight } from "react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import UserIcon from "../../assets/icons/profile-user-icon.svg";
import ProfileIcon from "../../assets/icons/user-with-rounded-border.svg";
import EditIcon from "../../assets/icons/edit-with-rounded-border.svg";
import PasswordIcon from "../../assets/icons/password-with-border.svg";
import LogOutIcon from "../../assets/icons/log-out-icon.svg";

import { ListItem } from "../../components/profile/ListItem";

export function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <UserIcon
                    width={45}
                    height={45}
                    color={THEME.COLORS.WHITE.FULL_WHITE}
                />
                <Text style={styles.name}>Name</Text>
            </View>

            <View style={styles.main}>
                <ListItem
                    text="Visualizar perfil"
                    icon={
                        <ProfileIcon
                            width={40}
                            height={40}
                            color={THEME.COLORS.GRAY.MEDIUM.V1}
                        />
                    }
                    onItemPress={() => {}}
                />
                <ListItem
                    text="Editar perfil"
                    icon={
                        <EditIcon
                            width={40}
                            height={40}
                            color={THEME.COLORS.GRAY.MEDIUM.V1}
                        />
                    }
                    onItemPress={() => {}}
                />
                <ListItem
                    text="Editar senha"
                    icon={
                        <PasswordIcon
                            width={40}
                            height={40}
                            color={THEME.COLORS.GRAY.MEDIUM.V1}
                        />
                    }
                    onItemPress={() => {}}
                />
                <View style={styles.logOutwrapper}>
                    <TouchableHighlight
                        style={styles.logOutButton}
                        onPress={() => {}}
                        activeOpacity={0.9}
                        underlayColor={THEME.COLORS.GRAY.LIGH.V1}
                    >
                        <View style={styles.logOutButtonWrapper}>
                            <LogOutIcon
                                width={30}
                                height={30}
                                color={THEME.COLORS.GRAY.DARK.V1}
                            />
                            <Text style={styles.buttonText}>
                                Sair do aplicativo
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}
