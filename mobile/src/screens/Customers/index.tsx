import { Fragment, useCallback, useRef, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    PixelRatio,
    StatusBar,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../database/database";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";
import AddIconWithBorder from "../../assets/icons/add-icon-with-border.svg";
import UserIconFilled from "../../assets/icons/user-icon-filled.svg";
import PhoneIconFilled from "../../assets/icons/phone-icon-filled.svg";
import DetailIconWithBaloonBorder from "../../assets/icons/detail-icon-with-baloon-border.svg";
import EditIconWithBorder from "../../assets/icons/edit-icon-with-border.svg";

import { ModalBuilder } from "../../components/shared/GenericModal/builder";
import { Card } from "../../components/Customers/Card/index";
import { Input } from "../../components/shared/Input";
import { BottomModal } from "../../components/shared/BottomModal";

interface Customer {
    id: number;
    name: string;
    phone: string;
}

const pixelDensity = PixelRatio.get();

export function Customers() {
    const paginationLimit = 20;
    const pageRef = useRef(1);
    const haveMoreRecordsRef = useRef(true);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerId, setCustomerId] = useState(-1);

    const [activeModalType, setActiveModalType] = useState("");
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isBottomModalOpened, setIsBottomModalOpened] = useState(false);
    const [keyForRefreshing, setKeyForRefreshing] = useState(0);

    function openModal() {
        setIsModalOpened(true);
    }

    function closeModal() {
        setIsModalOpened(false);
    }

    function openBottomModal(id: number) {
        setCustomerId(id);
        setIsBottomModalOpened(true);
    }

    function closeBottomModal() {
        setIsBottomModalOpened(false);
    }

    function handleOpenDetailsModal() {
        setActiveModalType("details");
        openModal();
    }

    function handleOpenEditModal() {
        setActiveModalType("edit");
        openModal();
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
                            `DELETE FROM customers WHERE id = ?;`,
                            [customerId],
                            (_, resultSet) => {
                                if (resultSet.rowsAffected !== 1) {
                                    Alert.alert(
                                        "Erro na exclusão",
                                        "Não foi possível excluir o cliente selecionado! Tente novamente"
                                    );
                                } else {
                                    Alert.alert(
                                        "Sucesso",
                                        "Cliente excluído com sucesso!"
                                    );

                                    try {
                                        setCustomers((current) =>
                                            current.filter(
                                                (customer) =>
                                                    customer.id !== customerId
                                            )
                                        );

                                        closeBottomModal();
                                    } catch (error) {
                                        Alert.alert(
                                            "Erro na exclusão",
                                            "Não foi possível excluir o cliente selecionado! Tente novamente"
                                        );
                                    }

                                    // updateScreen();
                                }
                            }
                        );
                    });
                },
            },
        ]);
    }

    function handleOpenCreateCustomerModal() {
        setActiveModalType("register");
        openModal();
    }

    function updateScreen() {
        setKeyForRefreshing(keyForRefreshing + 1);
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                const offset = (pageRef.current - 1) * paginationLimit;

                transaction.executeSql(
                    `SELECT * 
                    FROM customers 
                    LIMIT ${paginationLimit}
                    OFFSET ${offset};`,
                    undefined,
                    (_, resultSet) => {
                        const rawResultSet = resultSet.rows._array;

                        if (rawResultSet.length === 0) {
                            // console.log("Não existem mais registros");
                            haveMoreRecordsRef.current = false;
                            return;
                        }

                        const newCustomersList: Customer[] =
                            resultSet.rows._array.map((customer) => {
                                return {
                                    id: customer.id,
                                    name: customer.name,
                                    phone: customer.phone,
                                };
                            });

                        setCustomers([...customers, ...newCustomersList]);
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
            <View style={styles.backContainer}>
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
            </View>

            <View style={styles.mainContainer}>
                <FlatList
                    keyExtractor={(item, index) => String(item.id)}
                    data={customers}
                    renderItem={({ item, index }) => {
                        return index < customers.length ? (
                            <Card
                                key={item.id}
                                customerId={item.id}
                                customerName={item.name}
                                customerPhone={item.phone}
                                onOptionsClick={openBottomModal}
                                marginBottom={6}
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
                        if (haveMoreRecordsRef.current) {
                            pageRef.current = pageRef.current + 1;
                            updateScreen();
                        }
                    }}
                />
            </View>

            {isModalOpened && (
                <Modal
                    type={activeModalType}
                    userId={customerId}
                    refreshPageFunction={updateScreen}
                    onActionSucceeded={(customer) => {
                        if (activeModalType === "register") {
                            setCustomers([...customers, customer]);
                        } else if (activeModalType === "edit") {
                            // console.log(activeModalType);
                            // console.log(customer);
                            setCustomers((current) =>
                                current.map((oldCustomer) => {
                                    return customer.id === oldCustomer.id
                                        ? {
                                              id: customer.id,
                                              name: customer.name,
                                              phone: customer.phone,
                                          }
                                        : {
                                              id: oldCustomer.id,
                                              name: oldCustomer.name,
                                              phone: oldCustomer.phone,
                                          };
                                })
                            );
                        }
                    }}
                    onCloseModal={closeModal}
                    isOpened={isModalOpened}
                />
            )}

            {isBottomModalOpened && (
                <BottomModal
                    onDetailOption={handleOpenDetailsModal}
                    onEditOption={handleOpenEditModal}
                    onDeleteOption={handleOpenDeleteModal}
                    onCloseModal={closeBottomModal}
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
    onActionSucceeded?: (customer: {
        id: number;
        name: string;
        phone: string;
    }) => void;
    refreshPageFunction: () => void;
}) {
    let modal = <Fragment></Fragment>;

    if (props.type === "register") {
        modal = (
            <RegisterModal
                userId={props.userId}
                isOpened={props.isOpened}
                onCloseModal={props.onCloseModal}
                onActionSucceeded={
                    props.onActionSucceeded ? props.onActionSucceeded : () => {}
                }
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
    } else if (props.type === "edit") {
        modal = (
            <EditModal
                userId={props.userId}
                isOpened={props.isOpened}
                onCloseModal={props.onCloseModal}
                onActionSucceeded={
                    props.onActionSucceeded ? props.onActionSucceeded : () => {}
                }
                refreshPageFunction={props.refreshPageFunction}
            />
        );
    }

    return modal;
}

function RegisterModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    onActionSucceeded: (customer: {
        id: number;
        name: string;
        phone: string;
    }) => void;
    refreshPageFunction: () => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    function createNewCustomer() {
        if (name.trim() === "" || phone.trim() === "") {
            return Alert.alert(
                "Erro no cadastro",
                "Todos os campos devem ser preenchidos!"
            );
        }

        database.transaction((transaction) => {
            transaction.executeSql(
                `
          INSERT INTO customers (name, phone) VALUES (?, ?);
        `,
                [name, phone],
                (_, resultSet) => {
                    if (resultSet.rowsAffected !== 1) {
                        Alert.alert(
                            "Erro no cadastro",
                            "Não foi possível cadastrar o cliente! Tente novamente."
                        );
                    } else {
                        Alert.alert(
                            "Sucesso",
                            "Cliente cadastrado com sucesso!"
                        );
                        clearInputs();
                        props.onActionSucceeded({
                            id: resultSet.insertId!,
                            name,
                            phone,
                        });
                    }
                }
            );
        });
    }

    function clearInputs() {
        setName("");
        setPhone("");
    }

    const modal = new ModalBuilder()
        .withTitle("Cadastro de cliente")
        .withColor(THEME.COLORS.BLUE)
        .withIcon(<AddIconWithBorder color={THEME.COLORS.WHITE.FULL_WHITE} />)
        .withActionButtonText("Cadastrar")
        .withCloseModalText("Cancelar")
        .withIsOpened(props.isOpened)
        .withOnCloseModalFunction(() => {
            clearInputs();
            props.onCloseModal();
        })
        .withOnActionFunction(createNewCustomer)
        .withChildren(
            <>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    leftIcon={
                        <UserIconFilled
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={14}
                />
                <Input
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Telefone"
                    leftIcon={
                        <PhoneIconFilled
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

function DetailModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    refreshPageFunction: () => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `
                SELECT name, phone
                FROM customers
                WHERE id = ?;
            `,
                    [props.userId],
                    (_, resultSet) => {
                        setName(resultSet.rows.item(0).name);
                        setPhone(resultSet.rows.item(0).phone);
                    }
                );
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Detalhes")
        .withIcon(
            <DetailIconWithBaloonBorder
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
                        Telefone:
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
                        {phone}
                    </Text>
                </View>
            </View>
        )
        .build();

    return modal;
}

function EditModal(props: {
    userId: number;
    isOpened: boolean;
    onCloseModal: () => void;
    onActionSucceeded: (customer: {
        id: number;
        name: string;
        phone: string;
    }) => void;
    refreshPageFunction: () => void;
}) {
    const pixelDensity = PixelRatio.get();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    function editCustomer() {
        if (name.trim() === "" || phone.trim() === "") {
            return Alert.alert(
                "Erro na edição",
                "Todos os campos devem ser preenchidos!"
            );
        }

        database.transaction((transaction) => {
            transaction.executeSql(
                `
          UPDATE customers SET name = ?, phone = ? WHERE id = ?;
        `,
                [name, phone, props.userId],
                (_, resultSet) => {
                    if (resultSet.rowsAffected !== 1) {
                        Alert.alert(
                            "Erro na edição",
                            "Não foi possível editar os dados do cliente! Tente novamente."
                        );
                    } else {
                        Alert.alert(
                            "Sucesso",
                            "Cliente atualizado com sucesso!"
                        );

                        props.onActionSucceeded({
                            id: props.userId,
                            name,
                            phone,
                        });
                    }
                }
            );
        });
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT name, phone FROM customers WHERE id = ?;`,
                    [props.userId],
                    (_, resultSet) => {
                        setName(resultSet.rows.item(0).name);
                        setPhone(resultSet.rows.item(0).phone);
                    }
                );
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Edição")
        .withColor(THEME.COLORS.PINK.V2)
        .withIcon(
            <EditIconWithBorder
                color={THEME.COLORS.WHITE.FULL_WHITE}
                width={60}
                height={60}
            />
        )
        .withCloseModalText("Cancelar")
        .withActionButtonText("Salvar")
        .withIsOpened(props.isOpened)
        .withOnCloseModalFunction(props.onCloseModal)
        .withOnActionFunction(editCustomer)
        .withChildren(
            <>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    leftIcon={
                        <UserIconFilled
                            width={(70 * 1) / pixelDensity}
                            height={(70 * 1) / pixelDensity}
                            color={THEME.COLORS.GRAY.MEDIUM.V2}
                        />
                    }
                    marginBottom={14}
                />
                <Input
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Email"
                    leftIcon={
                        <PhoneIconFilled
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
