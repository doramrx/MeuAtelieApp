import { Fragment, useCallback, useContext, useState } from "react";
import {
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    PixelRatio,
    Alert,
    StatusBar,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { database } from "../../database/database";
import { AuthContext } from "../../contexts/AuthContext";

import { THEME } from "../../theme";
import { styles } from "./styles";

import UserIcon from "../../assets/icons/user-icon-filled.svg";
import ProfileIcon from "../../assets/icons/user-icon-with-border.svg";
import EditIcon from "../../assets/icons/edit-icon-with-border.svg";
import PasswordIcon from "../../assets/icons/password-icon-with-border.svg";
import LogOutIcon from "../../assets/icons/logout-icon.svg";
import DeleteProfileIcon from "../../assets/icons/trash-icon.svg";
import PasswordShieldIcon from "../../assets/icons/shield-icon-with-border.svg";
import EditModalIcon from "../../assets/icons/edit-icon-with-border.svg";
import EmailIcon from "../../assets/icons/email-icon-filled.svg";
import DetailsModalIcon from "../../assets/icons/detail-icon-with-baloon-border.svg";
import PasswordInputIcon from "../../assets/icons/password-icon-with-border.svg";

import { ListItem } from "../../components/profile/ListItem";
import { ModalBuilder } from "../../components/shared/GenericModal/builder";
import { Input } from "../../components/shared/Input";

const pixelDensity = PixelRatio.get();

export function Profile() {
    const { userId, setSetUserId } = useContext(AuthContext);
    const navigation = useNavigation();

    const [keyForRefreshing, setKeyForRefreshing] = useState(0);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [modalType, setModalType] = useState("");

    const [name, setName] = useState("");

    function openModal() {
        setIsModalOpened(true);
    }

    function closeModal() {
        setIsModalOpened(false);
    }

    function forceScreenUpdate() {
        setKeyForRefreshing(keyForRefreshing + 1);
    }

    function handleOpenDetails() {
        setModalType("details");
        openModal();
    }

    function handleOpenEdit() {
        setModalType("edit");
        openModal();
    }

    function handleOpenEditPassword() {
        setModalType("editPassword");
        openModal();
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
                                `DELETE FROM dressmakers WHERE id = ?;`,
                                [userId],
                                (_, resultSet) => {
                                    console.log(resultSet);

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
                    `
                    SELECT name FROM dressmakers WHERE id = ?;
                `,
                    [userId],
                    (_, resultSet) => {
                        setName(resultSet.rows.item(0).name);
                    }
                );
            });
        }, [keyForRefreshing])
    );

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />
            <View style={styles.topContainer}>
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
                    onItemPress={handleOpenDetails}
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
                    onItemPress={handleOpenEdit}
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
            </View>

            {isModalOpened && (
                <Modal
                    type={modalType}
                    userId={userId ? userId : -1}
                    isOpened={isModalOpened}
                    onCloseModal={closeModal}
                    refreshPageFunction={forceScreenUpdate}
                />
            )}
        </View>
    );
}

function Modal(props: {
    type: string;
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    refreshPageFunction: () => void;
    changeModalType?: (type: string) => void;
}) {
    let modal = <Fragment></Fragment>;

    if (props.type === "edit") {
        modal = (
            <EditModal
                userId={props.userId}
                isOpened={props.isOpened}
                onCloseModal={props.onCloseModal}
                refreshPageFunction={props.refreshPageFunction}
            />
        );
    } else if (props.type === "editPassword") {
        modal = (
            <EditPasswordModal
                userId={props.userId}
                isOpened={props.isOpened}
                onCloseModal={props.onCloseModal}
                refreshPageFunction={props.refreshPageFunction}
            />
        );
    } else if (props.type === "details") {
        modal = (
            <DetailModal
                userId={props.userId}
                isOpened={props.isOpened}
                onCloseModal={props.onCloseModal}
                refreshPageFunction={props.refreshPageFunction}
            />
        );
    }

    return modal;
}

function EditModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    refreshPageFunction: () => void;
}) {
    const pixelDensity = PixelRatio.get();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function editDressMakers() {
        console.log("Teste");

        database.transaction((transaction) => {
            transaction.executeSql(
                `
                SELECT id FROM dressmakers WHERE email = ? AND NOT id = ?;
            `,
                [email, props.userId],
                (_, resultSet) => {
                    if (resultSet.rows.length !== 0) {
                        return Alert.alert("Erro", "Email em uso");
                    }

                    transaction.executeSql(
                        `
                        UPDATE dressmakers
                        SET name = ?,
                            email = ?
                        WHERE id = ?;
                    `,
                        [name, email, props.userId],
                        (_, resultSet) => {
                            if (resultSet.rowsAffected === 1) {
                                Alert.alert(
                                    "Sucesso!",
                                    "Costureira atualizada com sucesso!"
                                );
                                props.refreshPageFunction();
                            } else {
                                Alert.alert(
                                    "Erro",
                                    "Não foi possível editar os dados da costureira!"
                                );
                            }
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
                    `
            SELECT name, email
            FROM dressmakers
            WHERE id = ?;
        `,
                    [props.userId],
                    (_, resultSet) => {
                        setName(resultSet.rows.item(0).name);
                        setEmail(resultSet.rows.item(0).email);
                    }
                );
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Editar")
        .withColor(THEME.COLORS.PINK.V2)
        .withIcon(
            <EditModalIcon
                color={THEME.COLORS.WHITE.FULL_WHITE}
                width={60}
                height={60}
            />
        )
        .withCloseModalText("Cancelar")
        .withActionButtonText("Salvar")
        .withIsOpened(props.isOpened)
        .withOnCloseModalFunction(props.onCloseModal)
        .withOnActionFunction(editDressMakers)
        .withChildren(
            <>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    leftIcon={
                        <UserIcon
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={14}
                />
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    leftIcon={
                        <EmailIcon
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={14}
                />
            </>
        )
        .build();

    return modal;
}

function EditPasswordModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    refreshPageFunction: () => void;
}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

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
                `
                SELECT password FROM dressmakers WHERE id = ?;
            `,
                [props.userId],
                (_, resultSet) => {
                    const password = resultSet.rows.item(0).password;
                    console.log(password);
                    if (currentPassword.trim() !== password) {
                        return Alert.alert(
                            "Erro ao alterar a senha",
                            "Senha atual inválida!"
                        );
                    }

                    transaction.executeSql(
                        `
                        UPDATE dressmakers
                        SET password = ?
                        WHERE id = ?;
                    `,
                        [newPassword, props.userId],
                        (_, resultSet) => {
                            if (resultSet.rowsAffected !== 1) {
                                Alert.alert(
                                    "Erro ao alterar a senha",
                                    "Não foi possível realizar a alteração de senha!"
                                );
                            } else {
                                Alert.alert(
                                    "Sucesso",
                                    "Senha alterada com sucesso!"
                                );
                            }
                        }
                    );
                }
            );
        });
    }

    const modal = new ModalBuilder()
        .withTitle("Alterar senha")
        .withColor(THEME.COLORS.PINK.V2)
        .withIcon(
            <PasswordShieldIcon
                color={THEME.COLORS.WHITE.FULL_WHITE}
                width={60}
                height={60}
            />
        )
        .withCloseModalText("Cancelar")
        .withActionButtonText("Salvar")
        .withIsOpened(props.isOpened)
        .withOnCloseModalFunction(props.onCloseModal)
        .withOnActionFunction(changePassword)
        .withChildren(
            <>
                <Input
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Senha atual"
                    isPasswordInput={true}
                    leftIcon={
                        <PasswordInputIcon
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={10}
                />
                <Input
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Nova senha"
                    isPasswordInput={true}
                    leftIcon={
                        <PasswordInputIcon
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={10}
                />
                <Input
                    value={newPasswordConfirmation}
                    onChangeText={setNewPasswordConfirmation}
                    placeholder="Confirmar senha"
                    isPasswordInput={true}
                    leftIcon={
                        <PasswordInputIcon
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                />
            </>
        )
        .build();

    return modal;
}

function DetailModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    refreshPageFunction: () => void;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `
                SELECT name, email
                FROM dressmakers
                WHERE id = ?;
            `,
                    [props.userId],
                    (_, resultSet) => {
                        setName(resultSet.rows.item(0).name);
                        setEmail(resultSet.rows.item(0).email);
                    }
                );
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Detalhes")
        .withIcon(
            <DetailsModalIcon
                color={THEME.COLORS.WHITE.FULL_WHITE}
                width={60}
                height={60}
            />
        )
        .withColor(THEME.COLORS.BLUE)
        .withCloseModalText("Cancelar")
        .withIsOpened(props.isOpened)
        .withOnCloseModalFunction(props.onCloseModal)
        .withChildren(
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        marginRight: 14,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
                            fontSize: 16,
                        }}
                    >
                        Nome:
                    </Text>
                    <Text
                        style={{
                            fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
                            fontSize: 16,
                        }}
                    >
                        E-mail:
                    </Text>
                </View>
                <View style={{}}>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                        }}
                    >
                        {email}
                    </Text>
                </View>
            </View>
        )
        .build();

    return modal;
}
