import { Fragment, useCallback, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from "react-native";
import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";

import { database } from "../../database/database";

import { styles } from "./styles";
import { THEME } from "../../theme";

import PenIcon from "../../assets/icons/pen-icon.svg";
import XIcon from "../../assets/icons/x-icon.svg";
import CalendarIconFilled from "../../assets/icons/calendar-icon-filled.svg";
import UpdateIcon from "../../assets/icons/update-icon.svg";
import EditIconWithBorder from "../../assets/icons/edit-icon-with-border.svg";

import { ClientInfo } from "../../components/Orders/OrderDetail/ClientInfo";
import { PhotoCard } from "../../components/Orders/PhotoCard";
import { MeasureList } from "../../components/Orders/MeasureList";
import { Input } from "../../components/shared/Input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ModalBuilder } from "../../components/shared/GenericModal/builder";
import { ServiceType } from "../Orders";
import {
    RepairOrAdjustmentList,
    RepairOrAdjustmentServiceItem,
} from "../RepairOrAdjustment";

type CustomerMeasure = {
    id: number | null;
    name: string;
    value: string | null;
};

interface AdjustData {
    id: number;
    description: string;
    cost: number;
}

interface OrderDetailProps {
    customerName: string;
    customerPhone: string;
    orderItemId: number;
    orderItemTitle: string;
    orderItemDescription?: string;
    hiredAt: Date;
    dueDate: Date;
    cost: number;
    measurements: CustomerMeasure[];
}

interface AdjustsServiceItemProps {
    orderedServiceId: number | null;
    adjustServiceId: number;
    adjustDescription: string;
    orderedServiceCost: number;
}

interface AdjustServiceItemProps {
    orderItemId: number;
    orderItemTitle: string;
    orderItemDescription?: string;
    adjusts: Array<AdjustsServiceItemProps>;
}

interface AdjustServiceProps {
    customerName: string;
    customerPhone: string;
    orderCost: number;
    orderDueDate: Date;
    orderHiredAt: Date;
    items: Array<AdjustServiceItemProps>;
}

export function OrderDetail() {
    const routeParams = useRoute().params as {
        orderId: number;
        orderType: ServiceType;
    };

    return routeParams.orderType === "Tailored" ? (
        <TailoredOrderDetail orderId={routeParams.orderId} />
    ) : (
        <AdjustOrderDetail orderId={routeParams.orderId} />
    );
}

function AdjustOrderDetail(props: { orderId: number }) {
    const [mode, setMode] = useState<"detail" | "edit">("detail");

    const [orderDetails, setOrderDetails] = useState<AdjustServiceProps>();

    function changeScreenMode() {
        if (mode === "detail") {
            setMode("edit");
        } else {
            setMode("detail");
        }
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT
                    (ord.cost) order_cost,
                    (ord.due_date) order_due_date,
                    (ord.created_at) order_hired_at,
                    (ord_it.id) order_item_id,
                    (ord_it.title) order_item_title,
                    (ord_it.description) order_item_description,
                    (ord_se.id) ordered_service_id,
                    (ord_se.cost) ordered_service_cost,
                    (adj_se.id) adjust_service_id,
                    (adj_se.description) adjust_service_description,
                    (cst.name) customer_name,
                    (cst.phone) customer_phone
                FROM orders ord
                JOIN customers cst ON ord.id_customer = cst.id
                JOIN order_items ord_it ON ord.id = ord_it.id_order
                JOIN ordered_services ord_se ON ord_it.id = ord_se.id_order_item
                JOIN adjust_services adj_se ON ord_se.id_adjust_service = adj_se.id
                WHERE ord.id = ?;`,
                    [props.orderId],
                    (_, resultSet) => {
                        console.log(
                            "=========================================="
                        );
                        console.log(resultSet);
                        console.log(
                            "=========================================="
                        );

                        const orderData = {
                            customerName: resultSet.rows.item(0).customer_name,
                            customerPhone:
                                resultSet.rows.item(0).customer_phone,
                            orderCost: resultSet.rows.item(0).order_cost,
                            orderHiredAt: new Date(
                                resultSet.rows.item(0).order_hired_at
                            ),
                            orderDueDate: new Date(
                                resultSet.rows.item(0).order_due_date
                            ),
                            items: [],
                        } as AdjustServiceProps;

                        resultSet.rows._array.forEach((row) => {
                            if (orderData.items.length === 0) {
                                orderData.items.push({
                                    orderItemId: row.order_item_id,
                                    orderItemTitle: row.order_item_title,
                                    orderItemDescription:
                                        row.order_item_description,
                                    adjusts: [
                                        {
                                            orderedServiceId:
                                                row.ordered_service_id,
                                            orderedServiceCost:
                                                row.ordered_service_cost,
                                            adjustServiceId:
                                                row.adjust_service_id,
                                            adjustDescription:
                                                row.adjust_service_description,
                                        },
                                    ],
                                });
                                return;
                            }

                            const lastIndex = orderData.items.length - 1;
                            const previousOrderItemId =
                                orderData.items[lastIndex].orderItemId;

                            if (row.order_item_id === previousOrderItemId) {
                                orderData.items[lastIndex].adjusts.push({
                                    orderedServiceId: row.ordered_service_id,
                                    orderedServiceCost:
                                        row.ordered_service_cost,
                                    adjustServiceId: row.adjust_service_id,
                                    adjustDescription:
                                        row.adjust_service_description,
                                });
                            } else {
                                orderData.items.push({
                                    orderItemId: row.order_item_id,
                                    orderItemTitle: row.order_item_title,
                                    orderItemDescription:
                                        row.order_item_description,
                                    adjusts: [
                                        {
                                            orderedServiceId:
                                                row.ordered_service_id,
                                            orderedServiceCost:
                                                row.ordered_service_cost,
                                            adjustServiceId:
                                                row.adjust_service_id,
                                            adjustDescription:
                                                row.adjust_service_description,
                                        },
                                    ],
                                });
                            }
                        });

                        // console.log(`customerName: ${orderData.customerName}`);
                        // console.log(
                        //     `customerPhone: ${orderData.customerPhone}`
                        // );
                        // console.log(`orderCost: ${orderData.orderCost}`);
                        // console.log(`orderHiredAt: ${orderData.orderHiredAt}`);
                        // console.log(`orderDueDate: ${orderData.orderDueDate}`);
                        // console.log(
                        //     "----------------------------------------------"
                        // );
                        // orderData.items.forEach((item) => {
                        //     console.log(`orderItemId: ${item.orderItemId}`);
                        //     console.log(
                        //         `orderItemTitle: ${item.orderItemTitle}`
                        //     );
                        //     console.log(
                        //         `orderItemDescription: ${item.orderItemDescription}`
                        //     );
                        //     console.log(
                        //         "----------------------------------------------"
                        //     );
                        //     item.adjusts.forEach((adjust) => {
                        //         console.log(
                        //             `orderedServiceId: ${adjust.orderedServiceId}`
                        //         );
                        //         console.log(
                        //             `orderedServiceCost: ${adjust.orderedServiceCost}`
                        //         );
                        //         console.log(
                        //             `adjustServiceId: ${adjust.adjustServiceId}`
                        //         );
                        //         console.log(
                        //             `adjustDescription: ${adjust.adjustDescription}`
                        //         );
                        //         console.log(
                        //             "----------------------------------------------"
                        //         );
                        //     });
                        //     console.log(
                        //         "----------------------------------------------"
                        //     );
                        // });

                        setOrderDetails(orderData);
                    }
                );
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />

            <View style={styles.backContainer}>
                <Text style={styles.title}>
                    {mode === "detail" ? "Detalhes" : "Editar pedido"}
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={changeScreenMode}
                >
                    {mode === "detail" ? (
                        <PenIcon
                            width={18}
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    ) : (
                        <XIcon
                            width={18}
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <ScrollView
                    style={[
                        styles.mainContainerWrapper,
                        { paddingHorizontal: 0 },
                    ]}
                >
                    {mode === "detail" ? (
                        <AdjustDetailMode orderDetails={orderDetails} />
                    ) : (
                        <AdjustEditMode
                            changeToDetailMode={changeScreenMode}
                            orderDetails={orderDetails}
                            setOrderDetails={setOrderDetails}
                            orderId={props.orderId}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

function AdjustDetailMode(props: {
    orderDetails: AdjustServiceProps | undefined;
}) {
    const navigation = useNavigation();

    const [orderItemsState, setOrderItemsState] = useState<boolean[]>();

    function handleGoBack() {
        navigation.goBack();
    }

    function expandItem(index: number) {
        if (!orderItemsState) {
            return;
        }

        const orderItemsStateCopy = [...orderItemsState];

        orderItemsStateCopy.forEach((itemState, itemStateIndex) => {
            if (itemStateIndex === index) {
                orderItemsStateCopy[itemStateIndex] = !itemState;
            } else {
                orderItemsStateCopy[itemStateIndex] = false;
            }
        });

        setOrderItemsState(orderItemsStateCopy);
    }

    useFocusEffect(
        useCallback(() => {
            if (!props.orderDetails) {
                return;
            }

            setOrderItemsState(props.orderDetails.items.map(() => false));
        }, [props.orderDetails])
    );

    return (
        <Fragment>
            <Text style={[styles.infoTitle, { paddingHorizontal: 25 }]}>
                Dados do cliente
            </Text>

            <ClientInfo
                name={props.orderDetails ? props.orderDetails.customerName : ""}
                phone={
                    props.orderDetails ? props.orderDetails.customerPhone : ""
                }
                containerStyles={{ paddingHorizontal: 25 }}
            />

            <Text style={[styles.infoTitle, { paddingHorizontal: 25 }]}>
                Detalhes do pedido
            </Text>

            {props.orderDetails &&
                props.orderDetails.items.map((item, index) => {
                    return (
                        <OrderItem
                            key={index}
                            itemName={`Peça (${(index + 1)
                                .toString()
                                .padStart(2, "0")})`}
                            data={item}
                            isExpanded={
                                orderItemsState ? orderItemsState[index] : false
                            }
                            isEditable={false}
                            onItemClick={() => expandItem(index)}
                        />
                    );
                })}

            <View
                style={[
                    styles.infoContainer,
                    { paddingHorizontal: 25, marginTop: 20 },
                ]}
            >
                <Text style={styles.infoLabel}>Contratado em:</Text>
                <Text style={styles.infoText}>
                    {props.orderDetails
                        ? props.orderDetails.orderHiredAt.toLocaleString(
                              "pt-BR"
                          )
                        : ""}
                </Text>
            </View>

            <View style={[styles.infoContainer, { paddingHorizontal: 25 }]}>
                <Text style={styles.infoLabel}>Data de entrega:</Text>
                <Text style={styles.infoText}>
                    {props.orderDetails
                        ? props.orderDetails.orderDueDate.toLocaleString(
                              "pt-BR"
                          )
                        : ""}
                </Text>
            </View>

            <View
                style={[
                    styles.infoContainer,
                    { paddingHorizontal: 25, marginBottom: 20 },
                ]}
            >
                <Text style={styles.infoLabel}>Valor:</Text>
                <Text style={styles.infoText}>
                    R${" "}
                    {props.orderDetails
                        ? props.orderDetails.orderCost
                              .toFixed(2)
                              .replace(".", ",")
                        : ""}
                </Text>
            </View>

            <TouchableHighlight
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={() => {}}
                style={[styles.changeStatusButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.changeStatusText]}>
                    Mudar status
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                onPress={handleGoBack}
                style={[styles.goBackButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.goBackText]}>
                    Voltar
                </Text>
            </TouchableHighlight>
        </Fragment>
    );
}

function AdjustEditMode(props: {
    orderDetails: AdjustServiceProps | undefined;
    setOrderDetails: (
        value: React.SetStateAction<AdjustServiceProps | undefined>
    ) => void;
    changeToDetailMode: () => void;
    orderId: number;
}) {
    const [orderItemsState, setOrderItemsState] = useState<boolean[]>();
    const [orderDetails, setOrderDetails] = useState<AdjustServiceProps>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function expandItem(index: number) {
        if (!orderItemsState) {
            return;
        }

        const orderItemsStateCopy = [...orderItemsState];

        orderItemsStateCopy.forEach((itemState, itemStateIndex) => {
            if (itemStateIndex === index) {
                orderItemsStateCopy[itemStateIndex] = !itemState;
            } else {
                orderItemsStateCopy[itemStateIndex] = false;
            }
        });

        setOrderItemsState(orderItemsStateCopy);
    }

    function updateOrderDetails(adjusts: AdjustData[]) {
        if (!orderItemsState) {
            return;
        }

        if (!orderDetails) {
            return;
        }

        const itemIndex = orderItemsState.findIndex((state) => state === true);
        const newAdjustList: AdjustsServiceItemProps[] = [];

        adjusts.forEach((adjust) => {
            const index = orderDetails.items[itemIndex].adjusts.findIndex(
                (adjustItem) => adjust.id === adjustItem.adjustServiceId
            );

            if (index !== -1) {
                newAdjustList.push(
                    orderDetails.items[itemIndex].adjusts[index]
                );
            } else {
                newAdjustList.push({
                    adjustServiceId: adjust.id,
                    adjustDescription: adjust.description,
                    orderedServiceCost: adjust.cost,
                    orderedServiceId: null,
                });
            }
        });

        const orderDetailsCopy = { ...orderDetails };
        orderDetailsCopy.items[itemIndex].adjusts = newAdjustList;

        setOrderDetails(orderDetailsCopy);
        closeModal();
    }

    function handleSaveModifications() {
        // console.log(orderDetails);

        database.transaction((transaction) => {
            const orderTotalCost = orderDetails!.items.reduce(
                (accumulator, item) => {
                    return (
                        accumulator +
                        item.adjusts.reduce((subtotal, adjust) => {
                            return subtotal + adjust.orderedServiceCost;
                        }, 0)
                    );
                },
                0
            );

            transaction.executeSql(
                `
                UPDATE orders
                SET
                    cost = ?,
                    due_date = ?
                WHERE id = ?;
            `,
                [
                    orderTotalCost,
                    orderDetails!.orderDueDate.toISOString(),
                    props.orderId,
                ],
                (transaction, resultSet) => {
                    if (resultSet.rowsAffected !== 1) {
                        return Alert.alert(
                            "Erro",
                            "Não foi possível atualizar o pedido de ajuste de roupa!"
                        );
                    }

                    orderDetails?.items.forEach((item) => {
                        transaction.executeSql(
                            `
                        UPDATE order_items
                        SET
                            title = ?,
                            description = ?
                        WHERE id = ?
                      `,
                            [
                                item.orderItemTitle,
                                item.orderItemDescription || "",
                                item.orderItemId,
                            ],
                            (transaction, resultSet) => {
                                if (resultSet.rowsAffected !== 1) {
                                    return Alert.alert(
                                        "Erro",
                                        "Não foi possível atualizar os itens de ajuste!"
                                    );
                                }

                                const registeredAdjustsNotRemoved =
                                    item.adjusts.filter(
                                        (adjust) =>
                                            adjust.orderedServiceId !== null
                                    );

                                if (registeredAdjustsNotRemoved.length > 0) {
                                    const deleteAdjustsSQL =
                                        registeredAdjustsNotRemoved
                                            .map((adjust) => {
                                                return adjust.orderedServiceId;
                                            })
                                            .join(",");

                                    transaction.executeSql(
                                        `DELETE FROM ordered_services WHERE id NOT IN (${deleteAdjustsSQL}) AND id_order_item = ?;`,
                                        [item.orderItemId],
                                        (_, resultSet) => {
                                            if (resultSet.rowsAffected === 0) {
                                                return Alert.alert(
                                                    "Erro",
                                                    "Não foi possível remover os ajustes de roupa!"
                                                );
                                            }
                                        }
                                    );
                                }

                                const adjustsToCreate = item.adjusts.filter(
                                    (adjust) => adjust.orderedServiceId === null
                                );

                                if (adjustsToCreate.length > 0) {
                                    const adjustsToCreateValuesSQL =
                                        adjustsToCreate.map((adjust) => {
                                            return `(${adjust.adjustServiceId}, ${item.orderItemId}, ${adjust.orderedServiceCost})`;
                                        });

                                    transaction.executeSql(
                                        `INSERT INTO ordered_services(id_adjust_service, id_order_item, cost) VALUES ${adjustsToCreateValuesSQL};`,
                                        undefined,
                                        (_, resultSet) => {
                                            if (
                                                resultSet.insertId &&
                                                resultSet.insertId === 0
                                            ) {
                                                return Alert.alert(
                                                    "Erro",
                                                    "Não foi possível cadastrar novos registros de ajuste de roupa!"
                                                );
                                            }
                                        }
                                    );
                                }

                                props.changeToDetailMode();
                                // props.setOrderDetails(orderDetails)
                            }
                        );
                    });
                }
            );
        });
    }

    function setDueDate(date: Date) {
        props.setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            return {
                ...prevState,
                orderDueDate: date,
            };
        });
    }

    function openDatePicker() {
        if (!props.orderDetails) {
            return;
        }

        DateTimePickerAndroid.open({
            value: props.orderDetails.orderDueDate,
            onChange: (_, date) => {
                date && setDueDate(date);
            },
            mode: "date",
            minimumDate: new Date(),
        });
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function setTitle(title: string, index: number) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            const stateCopy = { ...prevState };
            stateCopy.items[index!].orderItemTitle = title;

            return stateCopy;
        });
    }

    function setDescription(description: string, index: number) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            const stateCopy = { ...prevState };
            stateCopy.items[index!].orderItemDescription = description;

            return stateCopy;
        });
    }

    useFocusEffect(
        useCallback(() => {
            if (!props.orderDetails) {
                return;
            }

            setOrderDetails({ ...props.orderDetails });
            setOrderItemsState(props.orderDetails.items.map(() => false));
        }, [props.orderDetails])
    );

    return (
        <Fragment>
            <Text style={[styles.infoTitle, { paddingHorizontal: 25 }]}>
                Detalhes do pedido
            </Text>

            {orderDetails &&
                orderDetails.items.map((item, index) => {
                    return (
                        <OrderItem
                            key={index}
                            itemName={`Peça (${(index + 1)
                                .toString()
                                .padStart(2, "0")})`}
                            data={item}
                            isExpanded={
                                orderItemsState ? orderItemsState[index] : false
                            }
                            isEditable={true}
                            onItemClick={() => expandItem(index)}
                            onUpdateAdjustList={openModal}
                            setTitle={(title) => {
                                setTitle(title, index);
                            }}
                            setDescription={(description) => {
                                setDescription(description, index);
                            }}
                        />
                    );
                })}

            <View style={[styles.dueDateWrapper, { paddingHorizontal: 25 }]}>
                <Text style={styles.dueDateLabel}>
                    Selecione a data de entrega
                </Text>

                <Pressable
                    style={styles.dueDatePicker}
                    onPress={openDatePicker}
                >
                    <Text style={styles.dueDateValue}>
                        {orderDetails
                            ? orderDetails.orderDueDate.toLocaleDateString(
                                  "pt-BR"
                              )
                            : ""}
                    </Text>

                    <CalendarIconFilled
                        width={22}
                        height={22}
                        color={THEME.COLORS.GRAY.LIGHT.V1}
                    />
                </Pressable>
            </View>

            <Text
                style={[
                    styles.serviceCountForDueDateText,
                    { paddingHorizontal: 25 },
                ]}
            >
                * Existem 6 serviços para serem entregues nesta data!
            </Text>

            <TouchableHighlight
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={handleSaveModifications}
                style={[styles.saveOrderButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.saveOrderText]}>
                    Salvar alterações
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                onPress={props.changeToDetailMode}
                style={[styles.cancelButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.cancelText]}>
                    Cancelar
                </Text>
            </TouchableHighlight>

            {isModalOpen && (
                <AdjustListModal
                    isOpened={isModalOpen}
                    onCloseModalFn={closeModal}
                    selectedAdjusts={orderDetails ? orderDetails.items : []}
                    openedItem={
                        orderItemsState
                            ? orderItemsState.findIndex(
                                  (state) => state === true
                              )
                            : -1
                    }
                    saveUpdatedAdjustsFn={updateOrderDetails}
                />
            )}
        </Fragment>
    );
}

function OrderItem(props: {
    itemName: string;
    data: AdjustServiceItemProps;
    isExpanded: boolean;
    isEditable?: boolean;
    onItemClick: () => void;
    onUpdateAdjustList?: () => void;
    setTitle?: (title: string) => void;
    setDescription?: (description: string) => void;
}) {
    return (
        <View>
            <Pressable
                style={styles.expandableItem}
                onPress={props.onItemClick}
            >
                <Text style={styles.expandableItemText}>{props.itemName}</Text>
                <View style={styles.triangleIcon} />
            </Pressable>

            <View
                style={[
                    styles.expandableItemContent,
                    !props.isExpanded && {
                        height: 0,
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                    },
                ]}
            >
                <Input
                    placeholder="Título"
                    value={props.data.orderItemTitle}
                    onChangeText={props.setTitle}
                    marginBottom={10}
                    editable={props.isEditable}
                />
                <TextInput
                    placeholder="Descrição (opcional)"
                    value={props.data.orderItemDescription || ""}
                    onChangeText={props.setDescription}
                    style={styles.itemDescription}
                    multiline={true}
                    editable={props.isEditable}
                />

                <Text style={styles.infoTitle}>Ajustes solicitados</Text>

                <RepairOrAdjustmentList
                    serviceList={props.data.adjusts.map((adjust) => {
                        return {
                            id: adjust.adjustServiceId,
                            description: adjust.adjustDescription,
                            cost: adjust.orderedServiceCost,
                            isSelected: true,
                        };
                    })}
                    onServiceCheck={() => {}}
                    isSelectable={false}
                />

                {props.isEditable && (
                    <TouchableHighlight
                        underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
                        onPress={props.onUpdateAdjustList}
                        style={[
                            styles.button,
                            styles.updateMeasurementsButton,
                            { marginTop: 20 },
                        ]}
                    >
                        <View style={styles.updateMeasurementsContent}>
                            <UpdateIcon
                                color={THEME.COLORS.GRAY.MEDIUM.V1}
                                width={20}
                                height={20}
                            />
                            <Text style={styles.updateMeasurementsText}>
                                Atualizar ajustes
                            </Text>
                        </View>
                    </TouchableHighlight>
                )}
            </View>
        </View>
    );
}

function TailoredOrderDetail(props: { orderId: number }) {
    const routeParams = useRoute().params as {
        orderId: number;
        orderType: ServiceType;
    };

    const [mode, setMode] = useState<"detail" | "edit">("detail");
    const [orderDetails, setOrderDetails] = useState<OrderDetailProps>();

    function changeScreenMode() {
        if (mode === "detail") {
            setMode("edit");
        } else {
            setMode("detail");
        }
    }

    useFocusEffect(
        useCallback(() => {
            console.log("Renderizando novamente");
            console.log(routeParams);

            database.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT 
                    ord.cost,
                    ord.due_date,
                    ord.created_at,
                    ord.id_customer,
                    (ord_it.id) order_item_id,
                    (ord_it.title) order_item_title,
                    (ord_it.description) order_item_description,
                    (cst_me.id) customer_measure_id,
                    (cst_me.id) measure_id,
                    cst_me.measure,
                    (cst_me.value) measure_value,
                    (cst.name) customer_name,
                    (cst.phone) customer_phone
                FROM orders ord
                JOIN order_items ord_it 
                    ON ord.id = ord_it.id_order
                JOIN customer_measures cst_me
                    ON ord_it.id = cst_me.id_order_item
                JOIN customers cst
                    ON ord.id_customer = cst.id
                WHERE ord.id = ?;`,
                    [routeParams.orderId],
                    (_, resultSet) => {
                        if (resultSet.rows.length > 0) {
                            // console.log("------------------------------");
                            // resultSet.rows._array.forEach((row) => {
                            //     console.log(row);
                            // });
                            // console.log("------------------------------");

                            const measurementListData: CustomerMeasure[] =
                                resultSet.rows._array.map((rawData) => {
                                    return {
                                        id: rawData.measure_id,
                                        name: rawData.measure,
                                        value: rawData.measure_value
                                            ? String(
                                                  rawData.measure_value
                                                      .toFixed(2)
                                                      .replace(".", ",")
                                              )
                                            : "0",
                                    };
                                });

                            setOrderDetails({
                                customerName:
                                    resultSet.rows.item(0).customer_name,
                                customerPhone:
                                    resultSet.rows.item(0).customer_phone,
                                cost: resultSet.rows.item(0).cost,
                                hiredAt: new Date(
                                    resultSet.rows.item(0).created_at
                                ),
                                orderItemId:
                                    resultSet.rows.item(0).order_item_id,
                                orderItemTitle:
                                    resultSet.rows.item(0).order_item_title,
                                orderItemDescription:
                                    resultSet.rows.item(0)
                                        .order_item_description,
                                dueDate: new Date(
                                    resultSet.rows.item(0).due_date
                                ),
                                measurements: measurementListData,
                            });
                        }
                    }
                );
            });
        }, [routeParams.orderId])
    );

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />
            <View style={styles.backContainer}>
                <Text style={styles.title}>
                    {mode === "detail" ? "Detalhes" : "Editar pedido"}
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={changeScreenMode}
                >
                    {mode === "detail" ? (
                        <PenIcon
                            width={18}
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    ) : (
                        <XIcon
                            width={18}
                            color={THEME.COLORS.WHITE.FULL_WHITE}
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <ScrollView style={styles.mainContainerWrapper}>
                    {mode === "detail" ? (
                        <TailoredDetailMode
                            orderDetails={orderDetails!}
                            setOrderDetails={setOrderDetails}
                        />
                    ) : (
                        <TailoredEditMode
                            orderId={routeParams.orderId}
                            orderDetails={orderDetails!}
                            setOrderDetails={setOrderDetails}
                            changeToDetailMode={changeScreenMode}
                        />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

function TailoredDetailMode({
    orderDetails,
    setOrderDetails,
}: {
    orderDetails: OrderDetailProps;
    setOrderDetails: (
        value: React.SetStateAction<OrderDetailProps | undefined>
    ) => void;
}) {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleUpdateMeasureItem(index: number, newValue: string) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            const customerMeasurementListCopy = [...prevState.measurements];
            const updatedCustomerMeasurementList =
                customerMeasurementListCopy.map((measure, measureIndex) => {
                    return measureIndex === index
                        ? {
                              id: measure.id,
                              name: measure.name,
                              value: newValue.length === 0 ? null : newValue,
                          }
                        : measure;
                });

            return {
                ...prevState,
                measures: updatedCustomerMeasurementList,
            };
        });
    }

    return (
        <Fragment>
            <Text style={styles.infoTitle}>Dados do cliente</Text>

            <ClientInfo
                name={orderDetails ? orderDetails.customerName : ""}
                phone={orderDetails ? orderDetails.customerPhone : ""}
            />

            <Text style={styles.infoTitle}>Detalhes do pedido</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Título:</Text>
                <Text style={styles.infoText}>
                    {orderDetails?.orderItemTitle}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Descrição:</Text>
                <Text style={styles.infoText}>
                    {orderDetails?.orderItemDescription}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Contratado em:</Text>
                <Text style={styles.infoText}>
                    {orderDetails?.hiredAt.toLocaleString("pt-BR")}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Data de entrega:</Text>
                <Text style={styles.infoText}>
                    {orderDetails?.dueDate.toLocaleString("pt-BR")}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Valor:</Text>
                <Text style={styles.infoText}>
                    R$ {orderDetails?.cost.toFixed(2).replace(".", ",")}
                </Text>
            </View>

            <View style={styles.photoContainer}>
                <PhotoCard
                    total={3}
                    index={0}
                />
                <PhotoCard
                    total={3}
                    index={0}
                />
                <PhotoCard
                    total={3}
                    index={0}
                />
            </View>

            <Text style={styles.infoTitle}>Medidas</Text>

            <MeasureList
                data={orderDetails ? orderDetails.measurements : []}
                updateMeasureItemFn={handleUpdateMeasureItem}
                editable={false}
            />

            <TouchableHighlight
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={() => {}}
                style={[styles.changeStatusButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.changeStatusText]}>
                    Mudar status
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                onPress={handleGoBack}
                style={[styles.goBackButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.goBackText]}>
                    Voltar
                </Text>
            </TouchableHighlight>
        </Fragment>
    );
}

function TailoredEditMode(props: {
    orderId: number;
    orderDetails: OrderDetailProps;
    setOrderDetails: (
        value: React.SetStateAction<OrderDetailProps | undefined>
    ) => void;
    changeToDetailMode: () => void;
}) {
    const [orderDetails, setOrderDetails] = useState<OrderDetailProps>({
        ...props.orderDetails,
    });
    const [isModalOpen, setIsModalopen] = useState(false);

    function setTitle(title: string) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            return {
                ...prevState,
                orderItemTitle: title,
            };
        });
    }

    function setDescription(description: string) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            return {
                ...prevState,
                orderItemDescription: description,
            };
        });
    }

    function setDueDate(date: Date) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            return {
                ...prevState,
                dueDate: date,
            };
        });
    }

    function setCost(cost: string) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }

            return {
                ...prevState,
                cost: Number(cost.replace(",", ".")),
            };
        });
    }

    function handleSaveModifications() {
        database.transaction((transaction) => {
            transaction.executeSql(
                `
                UPDATE orders
                SET
                    cost = ?,
                    due_date = ?
                WHERE id = ?;
            `,
                [
                    orderDetails.cost,
                    orderDetails.dueDate.toISOString(),
                    props.orderId,
                ],
                (transaction, resultSet) => {
                    if (resultSet.rowsAffected !== 1) {
                        return Alert.alert(
                            "Erro",
                            "Não foi possível atualizar o pedido!"
                        );
                    }

                    transaction.executeSql(
                        `
                        UPDATE order_items
                        SET
                            title = ?,
                            description = ?
                        WHERE id = ?;
                    `,
                        [
                            orderDetails.orderItemTitle,
                            orderDetails.orderItemDescription || "",
                            orderDetails.orderItemId,
                        ],
                        (transaction, resultSet) => {
                            if (resultSet.rowsAffected !== 1) {
                                return Alert.alert(
                                    "Erro",
                                    "Não foi possível atualizar o item do pedido!"
                                );
                            }

                            // Itens que serão atualizados possuem um id e um valor
                            const measurementsToUpdate =
                                orderDetails.measurements.filter(
                                    (measure) =>
                                        measure.id !== null &&
                                        measure.value !== null
                                );

                            if (measurementsToUpdate.length > 0) {
                                console.log("itens para atualizar");
                                measurementsToUpdate.forEach((measure) =>
                                    console.log(measure)
                                );

                                measurementsToUpdate.forEach((measure) => {
                                    transaction.executeSql(
                                        `
                                        UPDATE customer_measures
                                        SET
                                            value = ?
                                        WHERE id = ?;
                                    `,
                                        [
                                            Number(
                                                measure.value!.replace(",", ".")
                                            ),
                                            measure.id,
                                        ],
                                        (_, resultSet) => {
                                            if (resultSet.rowsAffected === 1) {
                                                console.log(
                                                    "medida atualizada!"
                                                );
                                            } else {
                                                console.log(
                                                    "deu ruim na medida!"
                                                );
                                            }
                                        }
                                    );
                                });
                            }

                            const measurementsToCreate =
                                orderDetails.measurements.filter(
                                    (measure) =>
                                        measure.id === null &&
                                        measure.value !== null
                                );

                            if (measurementsToCreate.length > 0) {
                                console.log("itens para criar");
                                measurementsToCreate.forEach((measure) =>
                                    console.log(measure)
                                );

                                const measurementSQLValues =
                                    measurementsToCreate.map((measure) => {
                                        return `('${measure.name}', ${Number(
                                            measure.value?.replace(",", ".")
                                        )}, ${orderDetails.orderItemId})`;
                                    });

                                transaction.executeSql(
                                    `INSERT INTO customer_measures (measure, value, id_order_item) VALUES ${measurementSQLValues.join(
                                        ","
                                    )};`,
                                    [],
                                    (_, resultSet) => {
                                        if (
                                            resultSet.insertId &&
                                            resultSet.insertId > 0
                                        ) {
                                            console.log(
                                                "Registros inseridos com sucesso!"
                                            );
                                        } else {
                                            console.log(
                                                "Deu ruim na inserção de medidas!"
                                            );
                                        }
                                    }
                                );
                            }

                            const measurementsToDelete =
                                orderDetails.measurements.filter(
                                    (measures) =>
                                        measures.id !== null &&
                                        measures.value === null
                                );

                            if (measurementsToDelete.length > 0) {
                                console.log("itens para deletar");
                                measurementsToDelete.forEach((measure) =>
                                    console.log(measure)
                                );

                                const measurementsToDeleteSQL =
                                    measurementsToDelete
                                        .map((measure) => measure.id)
                                        .join(",");

                                console.log(
                                    `DELETE FROM customer_measures WHERE id IN (${measurementsToDeleteSQL});`
                                );

                                transaction.executeSql(
                                    `DELETE FROM customer_measures WHERE id IN (${measurementsToDeleteSQL});`,
                                    [],
                                    (_, resultSet) => {
                                        if (resultSet.rowsAffected > 0) {
                                            console.log(
                                                "registros deletados com sucesso!"
                                            );
                                        } else {
                                            console.log(
                                                "deu ruim na exclusão!"
                                            );
                                        }
                                    }
                                );
                            }

                            Alert.alert(
                                "Sucesso",
                                "Os dados do pedido foram atualizados com sucesso!"
                            );

                            const newMeasurementList: CustomerMeasure[] = [];

                            orderDetails.measurements.forEach((measure) => {
                                const measureFound = measurementsToDelete.find(
                                    (_measure) => _measure.name === measure.name
                                );

                                if (!measureFound) {
                                    newMeasurementList.push(measure);
                                }
                            });

                            props.setOrderDetails({
                                ...orderDetails,
                                measurements: newMeasurementList,
                            });
                            props.changeToDetailMode();
                        }
                    );
                }
            );
        });
    }

    function openDatePicker() {
        DateTimePickerAndroid.open({
            value: props.orderDetails.dueDate,
            onChange: (_, date) => {
                date && setDueDate(date);
            },
            mode: "date",
            minimumDate: new Date(),
        });
    }

    function saveUpdatedMeasurements(measurements: CustomerMeasure[]) {
        setOrderDetails((prevState) => {
            if (!prevState) {
                return prevState;
            }
            return {
                ...prevState,
                measurements: measurements,
            };
        });

        closeModal();
    }

    function openModal() {
        setIsModalopen(true);
    }

    function closeModal() {
        setIsModalopen(false);
    }

    return (
        <Fragment>
            <Text style={styles.infoTitle}>Roupa sob medida</Text>

            <Text style={styles.text}>Detalhes da peça</Text>

            <Input
                placeholder="Título da peça"
                containerStyles={styles.input}
                value={orderDetails.orderItemTitle}
                onChangeText={setTitle}
            />

            <TextInput
                placeholder="Descrição (opcional)"
                style={styles.orderDescription}
                multiline={true}
                value={orderDetails.orderItemDescription}
                onChangeText={setDescription}
            />

            <Text style={styles.optionalFieldsText}>
                Adicionar fotos do modelo (opcional)
            </Text>

            <View style={styles.photoContainer}>
                <PhotoCard
                    index={0}
                    total={3}
                />
            </View>

            <Text style={styles.optionalFieldsText}>
                Adicionar medidas do cliente (opcional)
            </Text>

            <MeasureList
                containerStyles={{ marginTop: 20 }}
                data={orderDetails.measurements.filter(
                    (measure) => measure.value !== null
                )}
                editable={false}
            />

            <TouchableHighlight
                underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
                onPress={openModal}
                style={[styles.button, styles.updateMeasurementsButton]}
            >
                <View style={styles.updateMeasurementsContent}>
                    <UpdateIcon
                        color={THEME.COLORS.GRAY.MEDIUM.V1}
                        width={20}
                        height={20}
                    />
                    <Text style={styles.updateMeasurementsText}>
                        Atualizar medidas
                    </Text>
                </View>
            </TouchableHighlight>

            <View style={styles.serviceCostWrapper}>
                <Text style={styles.serviceCostlabel}>Custo do serviço:</Text>
                <Input
                    placeholder="R$ 00,0"
                    maxLength={8}
                    keyboardType="numeric"
                    value={String(orderDetails.cost)}
                    onChangeText={(text) => {
                        const typedText = text.charAt(text.length - 1);
                        const commaCountInText = (text.match(/\,/g) || [])
                            .length;
                        const dotCountInText = (text.match(/\./g) || []).length;

                        if (commaCountInText >= 1 && dotCountInText >= 1) {
                            return;
                        }

                        if (
                            (typedText === "." && dotCountInText > 1) ||
                            (typedText === "," && commaCountInText > 1)
                        ) {
                            return;
                        }

                        if (
                            text.length === 1 &&
                            commaCountInText === 1 &&
                            typedText === ","
                        ) {
                            return setCost("0,");
                        }

                        if (
                            text.length === 1 &&
                            dotCountInText === 1 &&
                            typedText === "."
                        ) {
                            return setCost("0.");
                        }

                        if (commaCountInText <= 1 || dotCountInText <= 1) {
                            return setCost(text);
                        }
                    }}
                />
            </View>

            <View style={styles.dueDateWrapper}>
                <Text style={styles.dueDateLabel}>
                    Selecione a data de entrega
                </Text>
                <Pressable
                    style={styles.dueDatePicker}
                    onPress={openDatePicker}
                >
                    <Text style={styles.dueDateValue}>
                        {orderDetails.dueDate.toLocaleDateString("pt-BR")}
                    </Text>
                    <CalendarIconFilled
                        width={22}
                        height={22}
                        color={THEME.COLORS.GRAY.LIGHT.V1}
                    />
                </Pressable>
            </View>

            <Text style={styles.serviceCountForDueDateText}>
                * Existem 6 serviços para serem entregues nesta data!
            </Text>

            <TouchableHighlight
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={handleSaveModifications}
                style={[styles.saveOrderButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.saveOrderText]}>
                    Salvar alterações
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                onPress={props.changeToDetailMode}
                style={[styles.cancelButton, styles.button]}
            >
                <Text style={[styles.buttonText, styles.cancelText]}>
                    Cancelar
                </Text>
            </TouchableHighlight>

            {isModalOpen && (
                <MeasurementListModal
                    isOpened={isModalOpen}
                    onCloseModalFn={closeModal}
                    existentMeasurements={
                        orderDetails ? orderDetails.measurements : []
                    }
                    saveUpdatedMeasurementsFn={saveUpdatedMeasurements}
                />
            )}
        </Fragment>
    );
}

function MeasurementListModal(props: {
    isOpened: boolean;
    onCloseModalFn: () => void;
    existentMeasurements: CustomerMeasure[];
    saveUpdatedMeasurementsFn: (measurements: CustomerMeasure[]) => void;
}) {
    const [measurementList, setMeasurementList] = useState<CustomerMeasure[]>([
        { id: null, name: "Abdômen", value: null },
        { id: null, name: "Busto", value: null },
        { id: null, name: "Cintura", value: null },
        { id: null, name: "Comprimento", value: null },
        { id: null, name: "Manga", value: null },
        { id: null, name: "Ombro", value: null },
        { id: null, name: "Punho", value: null },
        { id: null, name: "Quadril", value: null },
    ]);

    function updateMeasureItem(index: number, newValue: string) {
        setMeasurementList((prevState) =>
            prevState.map((measure, measureIndex) => {
                return measureIndex === index
                    ? {
                          id: measure.id,
                          name: measure.name,
                          value: newValue.length === 0 ? null : newValue,
                      }
                    : measure;
            })
        );
    }

    function getUpdatedMeasurements() {
        const updatedMeasurements = measurementList.filter(
            (measure) => measure.value !== null || measure.id !== null
        );

        props.saveUpdatedMeasurementsFn(updatedMeasurements);
    }

    useFocusEffect(
        useCallback(() => {
            const measurementListCopy = [...measurementList];

            props.existentMeasurements.forEach((measurement) => {
                const index = measurementListCopy.findIndex(
                    (measurementCp) => measurementCp.name === measurement.name
                );

                if (index !== -1) {
                    measurementListCopy[index].id = measurement.id;
                    measurementListCopy[index].value = measurement.value;
                }

                setMeasurementList(measurementListCopy);
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Editar medidas")
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
        .withOnCloseModalFunction(props.onCloseModalFn)
        .withOnActionFunction(getUpdatedMeasurements)
        .withChildren(
            <Fragment>
                <MeasureList
                    data={measurementList}
                    updateMeasureItemFn={updateMeasureItem}
                    containerStyles={{
                        width: "100%",
                    }}
                />
            </Fragment>
        )
        .build();

    return modal;
}

function AdjustListModal(props: {
    isOpened: boolean;
    onCloseModalFn: () => void;
    selectedAdjusts: AdjustServiceItemProps[];
    openedItem: number;
    saveUpdatedAdjustsFn: (adjusts: AdjustData[]) => void;
}) {
    const [adjustList, setAdjustList] = useState<AdjustData[]>([]);
    const [adjustListState, setAdjustListState] = useState<boolean[]>([]);

    function getUpdatedAdjusts() {
        const selectedAdjusts: AdjustData[] = [];

        adjustListState.forEach((state, index) => {
            if (state) {
                selectedAdjusts.push(adjustList[index]);
            }
        });

        props.saveUpdatedAdjustsFn(selectedAdjusts);
    }

    function handleSelectAdjust(index: number) {
        const adjustListStateCopy = [...adjustListState];
        adjustListStateCopy[index] = !adjustListStateCopy[index];

        setAdjustListState(adjustListStateCopy);
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT id, description, cost FROM adjust_services;`,
                    undefined,
                    (_, resultSet) => {
                        const adjusts: AdjustData[] = resultSet.rows._array.map(
                            (row) => {
                                return {
                                    id: row.id,
                                    description: row.description,
                                    cost: row.cost,
                                };
                            }
                        );

                        const itemStates = adjusts.map((adjust) => {
                            const selectedAdjust =
                                props.selectedAdjusts[props.openedItem].adjusts;
                            const adjustIndex = selectedAdjust.findIndex(
                                (item) => item.adjustServiceId === adjust.id
                            );

                            return adjustIndex !== -1 ? true : false;
                        });

                        setAdjustList(adjusts);
                        setAdjustListState(itemStates);
                    }
                );
            });
        }, [])
    );

    const modal = new ModalBuilder()
        .withTitle("Editar ajustes")
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
        .withOnCloseModalFunction(props.onCloseModalFn)
        .withOnActionFunction(getUpdatedAdjusts)
        .withChildren(
            <Fragment>
                {adjustList.map((adjust, index) => {
                    return (
                        <RepairOrAdjustmentServiceItem
                            key={adjust.id}
                            name={adjust.description}
                            cost={adjust.cost}
                            isChecked={adjustListState[index]}
                            onCheck={() => {
                                handleSelectAdjust(index);
                            }}
                            isSelectable={true}
                        />
                    );
                })}
            </Fragment>
        )
        .build();

    return modal;
}
