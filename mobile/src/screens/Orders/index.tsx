import { useCallback, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    TouchableHighlight,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { THEME } from "../../theme";
import { styles } from "./styles";
import AddIcon from "../../assets/icons/add-icon.svg";
import SewingMachineIcon from "../../assets/icons/sewing-machine-icon.svg";

import { Card } from "../../components/Orders/Card";
import { Options } from "../../components/Orders/Options";
import { ModalBuilder } from "../../components/shared/GenericModal/builder";
import { database } from "../../database/database";

interface OrderData {
    orderId: number;
    orderType: ServiceType;
    orderItems: Array<{
        title: string;
        dueDate: Date;
    }>;
}

type ServiceType = "Tailored" | "RepairOrAdjust";

export function Orders() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orders, setOrders] = useState<OrderData[]>([]);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    useFocusEffect(
        useCallback(() => {
            database.readTransaction((transaction) => {
                transaction.executeSql(
                    `SELECT 
                        ord.id,
                        ori.title,
                        ord.due_date,
                        ord.type
                    FROM orders AS ord
                    JOIN order_items AS ori ON ori.id_order = ord.id;`,
                    undefined,
                    (_, resultSet) => {
                        resultSet.rows._array.forEach((item) => {
                            console.log(item);
                        });

                        const orderList: OrderData[] = [];

                        resultSet.rows._array.forEach((item) => {
                            if (item.type === "Tailored") {
                                orderList.push({
                                    orderId: item.id,
                                    orderType: item.type,
                                    orderItems: [
                                        {
                                            title: item.title,
                                            dueDate: new Date(item.due_date),
                                        },
                                    ],
                                });
                            } else {
                                if (
                                    orderList[orderList.length - 1].orderId ===
                                    item.id
                                ) {
                                    orderList[
                                        orderList.length - 1
                                    ].orderItems.push({
                                        title: item.title,
                                        dueDate: new Date(item.due_date),
                                    });
                                } else {
                                    orderList.push({
                                        orderId: item.id,
                                        orderType: item.type,
                                        orderItems: [
                                            {
                                                title: item.title,
                                                dueDate: new Date(
                                                    item.due_date
                                                ),
                                            },
                                        ],
                                    });
                                }
                            }
                        });

                        orderList.forEach(item => {
                            console.log(`Order id: ${item.orderId}`);
                            console.log(`Order type: ${item.orderType}`);
                            item.orderItems.forEach(orderItems => {
                                console.log(`\ttitle: ${orderItems.title}`);
                                console.log(`\tdueDate: ${orderItems.dueDate}`);
                                
                            });
                            console.log("-----------------------------------------------");
                        })

                        // const orders = resultSet.rows._array.map((rawOrder) => {
                        //     return {
                        //         id: rawOrder.id,
                        //         title: rawOrder.title,
                        //         dueDate: new Date(rawOrder.due_date),
                        //         type: rawOrder.type,
                        //     };
                        // });

                        // setOrders(orderList);
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
                <Text style={styles.title}>Pedidos</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={openModal}
                >
                    <AddIcon
                        width={18}
                        color={THEME.COLORS.WHITE.FULL_WHITE}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <Options />
                <Text style={styles.listCounter}>
                    {orders.length} Pedidos listados
                </Text>
                {orders.map(({ id, title, dueDate, type }, index, array) => {
                    return array.length - 1 !== index ? (
                        <Card
                            key={id}
                            title={title}
                            type={type}
                            dueDate={dueDate}
                            marginBottom={6}
                        />
                    ) : (
                        <Card
                            key={id}
                            title={title}
                            type={type}
                            dueDate={dueDate}
                        />
                    );
                })}
            </View>

            {
                <ServiceTypeModal
                    isOpen={isModalOpen}
                    onCloseModal={closeModal}
                />
            }
        </View>
    );
}

function ServiceTypeModal(props: {
    isOpen: boolean;
    onCloseModal: () => void;
}) {
    const navigation = useNavigation();

    function navigateToService(
        service: "tailoredClothes" | "repairOrAdjustment"
    ) {
        props.onCloseModal();
        navigation.navigate(service);
    }

    const modal = new ModalBuilder()
        .withTitle("Selecione o tipo de serviço")
        .withIcon(
            <SewingMachineIcon
                color={THEME.COLORS.WHITE.FULL_WHITE}
                width={60}
                height={60}
            />
        )
        .withColor(THEME.COLORS.PINK.V2)
        .withCloseModalText("Cancelar")
        .withIsOpened(props.isOpen)
        .withOnCloseModalFunction(props.onCloseModal)
        .withChildren(
            <>
                <TouchableHighlight
                    underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                    activeOpacity={0.98}
                    style={{
                        backgroundColor: THEME.COLORS.PINK.V2,
                        alignItems: "center",
                        paddingVertical: 8,
                        borderRadius: 12,
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        navigateToService("repairOrAdjustment");
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
                            fontSize: 16,
                            color: THEME.COLORS.WHITE.FULL_WHITE,
                        }}
                    >
                        Ajuste/conserto de peça
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                    activeOpacity={0.98}
                    style={{
                        backgroundColor: THEME.COLORS.PINK.V2,
                        alignItems: "center",
                        paddingVertical: 8,
                        borderRadius: 12,
                    }}
                    onPress={() => {
                        navigateToService("tailoredClothes");
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: THEME.FONT.WEIGHT.MEDIUM as any,
                            fontSize: 16,
                            color: THEME.COLORS.WHITE.FULL_WHITE,
                        }}
                    >
                        Roupa sob medida
                    </Text>
                </TouchableHighlight>
            </>
        )
        .build();

    return modal;
}
