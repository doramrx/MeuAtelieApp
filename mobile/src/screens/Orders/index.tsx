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
    id: number;
    title: string;
    type: ServiceType;
    dueDate: Date;
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
                    "SELECT id, title, type, dueDate FROM orders;",
                    undefined,
                    (_, resultSet) => {
                        const orders = resultSet.rows._array.map((rawOrder) => {
                            return {
                                id: rawOrder.id,
                                title: rawOrder.title,
                                dueDate: new Date(rawOrder.dueDate),
                                type: rawOrder.type,
                            };
                        });

                        setOrders(orders);
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
                <Text style={styles.listCounter}>{orders.length} Pedidos listados</Text>
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
