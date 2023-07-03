import { useCallback, useRef, useState } from "react";
import {
    Alert,
    StatusBar,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { THEME } from "../../theme";

import XIcon from "../../assets/icons/x-icon.svg";
import ArrowIcon from "../../assets/icons/arrow-icon.svg";
import CheckIcon from "../../assets/icons/check-icon.svg";
import CalendarIconFilled from "../../assets/icons/calendar-icon-filled.svg";

import { ServiceSteps, Step1 } from "../TailoredClothes";
import { Input } from "../../components/shared/Input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { database } from "../../database/database";

interface Service {
    id: number;
    description: string;
    cost: number;
}

interface AdjustServices {
    id: number;
    description: string;
    cost: number;
    isSelected: boolean;
}

interface PieceItemsData {
    isExpanded: boolean;
    title: string;
    description: string | null;
    adjustServices: AdjustServices[];
}

export function RepairOrAdjustment() {
    const navigation = useNavigation();

    const [currentStep, setCurrentStep] = useState<ServiceSteps>("customer");
    const [selectedCustomerId, setSelectedCustomerId] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function saveSelectedCustomerId(id: number) {
        setSelectedCustomerId(id);
        // console.log(id);
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function abortNewService() {
        Alert.alert(
            "Confirmação",
            "Deseja realmente abortar a criação do serviço?",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.goBack();
                    },
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ]
        );
    }

    function saveServiceOrder(pieceData: PieceItemsData[], dueDate: Date) {
        const totalCost = pieceData.reduce((accumulator, datum) => {
            return (
                accumulator +
                datum.adjustServices.reduce((totalServiceCost, service) => {
                    return totalServiceCost + service.cost;
                }, 0)
            );
        }, 0);

        // pieceData.forEach((item) => {
        //     // console.log(item.title);
        //     // console.log(item.description);
        //     // console.log(item.adjustServices);
        // });

        database.transaction((transaction) => {
            transaction.executeSql(
                `INSERT INTO orders (cost, due_date, type, created_at, id_customer) 
                VALUES (?, ?, ?, ?, ?);`,
                [
                    totalCost,
                    dueDate.toISOString(),
                    "Adjust",
                    new Date().toISOString(),
                    selectedCustomerId,
                ],
                (_, resultSet) => {
                    const insertedOrderId = resultSet.insertId;

                    if (insertedOrderId === undefined) {
                        return Alert.alert(
                            "Erro",
                            "Não foi possível cadastrar um novo serviço!"
                        );
                    }

                    pieceData.forEach((pieceDatum) => {
                        transaction.executeSql(
                            `INSERT INTO order_items (title, description, id_order) VALUES (?, ?, ?);`,
                            [
                                pieceDatum.title,
                                pieceDatum.description,
                                insertedOrderId,
                            ],
                            (transaction, resultSet) => {
                                const insertedOrderItemId = resultSet.insertId;

                                console.log(
                                    `Order item id: ${insertedOrderItemId}`
                                );

                                if (insertedOrderItemId === undefined) {
                                    return Alert.alert(
                                        "Erro",
                                        "Não foi possível cadastrar um novo serviço!"
                                    );
                                }

                                const selectedAdjustServicesValueStatement =
                                    pieceDatum.adjustServices
                                        .map((adjustService) => {
                                            return `(${adjustService.id}, ${insertedOrderItemId}, ${adjustService.cost})`;
                                        })
                                        .join(",");

                                transaction.executeSql(
                                    `INSERT INTO ordered_services (id_adjust_service, id_order_item, cost) VALUES ${selectedAdjustServicesValueStatement};`,
                                    undefined,
                                    (_, resultSet) => {
                                        Alert.alert(
                                            "Sucesso",
                                            "Serviço de ajuste cadastrado com sucesso!"
                                        );

                                        navigation.navigate("orders");
                                    }
                                );
                            }
                        );
                    });
                }
            );
        });
    }

    function moveToNextStep() {
        if (currentStep === "customer") {
            if (selectedCustomerId !== -1) {
                setCurrentStep("details");
            } else {
                Alert.alert(
                    "Erro",
                    "Selecione um cliente para prosseguir para a próxima etapa!"
                );
            }
        }
    }

    function moveToPreviousStep() {
        setCurrentStep("customer");
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                barStyle="default"
                backgroundColor={THEME.COLORS.PINK.V2}
            />

            <View style={styles.backContainer}>
                <Text style={styles.screenTitle}>Novo serviço</Text>
                <TouchableOpacity
                    style={styles.cancelOrderButton}
                    onPress={abortNewService}
                >
                    <XIcon
                        width={18}
                        color={THEME.COLORS.WHITE.FULL_WHITE}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                {currentStep === "customer" ? (
                    <Step1
                        title="Ajuste de peça"
                        openModal={openModal}
                        selectedCustomer={selectedCustomerId}
                        onSelectCustomer={saveSelectedCustomerId}
                    />
                ) : (
                    <Step2 onFinishOrder={saveServiceOrder} />
                )}
            </View>

            <TouchableHighlight
                style={styles.nextStepButton}
                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                onPress={
                    currentStep === "customer"
                        ? moveToNextStep
                        : moveToPreviousStep
                }
            >
                <View style={{ width: "100%" }}>
                    {currentStep === "customer" ? (
                        <>
                            <Text style={styles.nextStepText}>Próximo</Text>
                            <ArrowIcon
                                color={THEME.COLORS.PINK.V1}
                                width={25}
                                height={25}
                                style={styles.rightArrowIcon}
                            />
                        </>
                    ) : (
                        <>
                            <ArrowIcon
                                color={THEME.COLORS.PINK.V1}
                                width={25}
                                height={25}
                                style={styles.leftArrowIcon}
                            />
                            <Text style={styles.nextStepText}>Voltar</Text>
                        </>
                    )}
                </View>
            </TouchableHighlight>
        </View>
    );
}

function Step2(props: {
    onFinishOrder: (pieceData: PieceItemsData[], dueDate: Date) => void;
}) {
    const [pieceAmount, setPieceAmount] = useState("");
    const [pieceData, setPieceData] = useState<PieceItemsData[]>([]);
    const [dueDate, setDueDate] = useState(new Date());
    const registeredServices = useRef<Service[]>([]);

    function toggleExpanded(selectedPieceIndex: number) {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const pieceDataCopy = [...pieceData];

        pieceDataCopy.forEach((item, index) => {
            if (index === selectedPieceIndex) {
                item.isExpanded = !item.isExpanded;
            } else {
                item.isExpanded = false;
            }
        });

        setPieceData(pieceDataCopy);
    }

    function initPieceItems() {
        if (pieceData.length < Number(pieceAmount)) {
            const data = [];

            for (let i = 0; i < Number(pieceAmount) - pieceData.length; i++) {
                data.push({
                    title: "",
                    description: "",
                    isExpanded: false,
                    adjustServices: registeredServices.current.map(
                        (service) => {
                            return {
                                ...service,
                                isSelected: false,
                            };
                        }
                    ),
                });
            }
            setPieceData([...pieceData, ...data]);
        } else if (pieceData.length > Number(pieceAmount)) {
            const pieceDataCopy = [...pieceData];
            const newPieceData = pieceDataCopy.slice(0, Number(pieceAmount));
            setPieceData(newPieceData);
        } else {
            const data = [];

            for (let i = 0; i < Number(pieceAmount); i++) {
                data.push({
                    title: "",
                    description: "",
                    isExpanded: false,
                    adjustServices: registeredServices.current.map(
                        (service) => {
                            return {
                                ...service,
                                isSelected: false,
                            };
                        }
                    ),
                });
            }
            setPieceData(data);
        }
    }

    function updateSelectedServiceList(
        pieceIndex: number,
        serviceIndex: number
    ) {
        console.log(
            `pieceIndex: ${pieceIndex} - serviceIndex: ${serviceIndex}`
        );

        const pieceDataCopy = [...pieceData];
        pieceDataCopy[pieceIndex].adjustServices[serviceIndex].isSelected =
            !pieceDataCopy[pieceIndex].adjustServices[serviceIndex].isSelected;

        // // console.log(pieceDataCopy[pieceIndex].title);
        // // console.log(pieceDataCopy[pieceIndex].description);
        // // console.log(pieceDataCopy[pieceIndex].isExpanded);
        // pieceDataCopy[pieceIndex].adjustServices.forEach((item) => {
        //     // console.log(item);
        // });

        setPieceData(pieceDataCopy);
    }

    function openDatePicker() {
        DateTimePickerAndroid.open({
            value: dueDate,
            onChange: (_, date) => {
                date && setDueDate(date);
            },
            mode: "date",
            minimumDate: new Date(),
        });
    }

    function updatePieceTitle(title: string, index: number) {
        const pieceDataCopy = [...pieceData];
        pieceDataCopy[index].title = title;
        setPieceData(pieceDataCopy);
    }

    function updatePieceDescription(description: string, index: number) {
        const pieceDataCopy = [...pieceData];
        pieceDataCopy[index].description = description;
        setPieceData(pieceDataCopy);
    }

    function finishAdjustServiceOrder() {
        const pieceDataCopy = [...pieceData].map((pieceDatum) => {
            const selectedAdjustServices: AdjustServices[] =
                pieceDatum.adjustServices.reduce(
                    (selectedServiceList, adjustService) => {
                        if (adjustService.isSelected) {
                            selectedServiceList.push(adjustService);
                        }

                        return selectedServiceList;
                    },
                    [] as AdjustServices[]
                );

            return {
                ...pieceDatum,
                adjustServices: selectedAdjustServices,
            };
        });

        props.onFinishOrder(pieceDataCopy, dueDate);
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    "SELECT * FROM adjust_services;",
                    undefined,
                    (_, resultSet) => {
                        const services: Service[] = resultSet.rows._array.map(
                            (rawData) => {
                                return {
                                    id: rawData.id,
                                    description: rawData.description,
                                    cost: rawData.cost,
                                };
                            }
                        );

                        registeredServices.current = services;
                    }
                );
            });
            initPieceItems();
        }, [])
    );

    return (
        <ScrollView>
            <View style={styles.step2Wrapper}>
                <Text style={styles.formTitle}>Ajuste/conserto de roupas</Text>
                <Text style={styles.textBold}>Adicionar detalhes da peça</Text>
                <Text style={styles.fieldText}>Número de peças</Text>
                <Input
                    placeholder="Quantidade"
                    containerStyles={styles.amountInput}
                    keyboardType="numeric"
                    maxLength={5}
                    value={String(pieceAmount)}
                    onChangeText={(text) => {
                        setPieceAmount(text);
                    }}
                    onEndEditing={() => {
                        initPieceItems();
                    }}
                />

                <View style={styles.pieceList}>
                    {pieceData.map((datum, index) => {
                        return (
                            <ExpandableItem
                                key={index}
                                itemName={`Peça (${index + 1})`}
                                isExpanded={datum.isExpanded}
                                serviceList={datum.adjustServices}
                                onClickFunction={() => {
                                    toggleExpanded(index);
                                }}
                                onServiceCheck={(serviceIndex) => {
                                    updateSelectedServiceList(
                                        index,
                                        serviceIndex
                                    );
                                }}
                                pieceTitle={datum.title}
                                onChangePieceTitle={(title) => {
                                    updatePieceTitle(title, index);
                                }}
                                pieceDescription={datum.description}
                                onChangePieceDescription={(description) => {
                                    updatePieceDescription(description, index);
                                }}
                            />
                        );
                    })}
                </View>

                <View style={styles.totalServiceCostContainer}>
                    <Text style={styles.totalServiceCostText}>
                        Valor total:
                    </Text>
                    <Text style={styles.totalServiceCostText}>
                        R${" "}
                        {pieceData
                            .reduce((accumulator, pieceDatum) => {
                                const selectedServicesTotalCost =
                                    pieceDatum.adjustServices.reduce(
                                        (totalCost, adjustService) => {
                                            return adjustService.isSelected
                                                ? totalCost + adjustService.cost
                                                : totalCost;
                                        },
                                        0
                                    );

                                return accumulator + selectedServicesTotalCost;
                            }, 0)
                            .toFixed(2)
                            .replace(".", ",")}
                    </Text>
                </View>

                <View style={styles.dueDateWrapper}>
                    <Text style={styles.dueDateLabel}>
                        Selecione a data de entrega
                    </Text>
                    <Pressable
                        style={styles.dueDatePicker}
                        onPress={() => {
                            // console.log("Open date picker");
                            openDatePicker();
                        }}
                    >
                        <Text style={styles.dueDateValue}>
                            {dueDate.toLocaleDateString("pt-BR")}
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
                    underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                    onPress={() => {}}
                    style={[styles.navigateToAgendaButton, styles.button]}
                >
                    <Text
                        style={[styles.buttonText, styles.navigateToAgendaText]}
                    >
                        Ir para a agenda
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                    onPress={finishAdjustServiceOrder}
                    style={[styles.finishOrderButton, styles.button]}
                >
                    <Text style={[styles.buttonText, styles.finishOrderText]}>
                        Finalizar o pedido
                    </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

export function ExpandableItem(props: {
    itemName: string;
    pieceTitle: string;
    pieceDescription: string | null;
    onChangePieceTitle: (title: string) => void;
    onChangePieceDescription: (description: string) => void;
    isExpanded: boolean;
    onClickFunction: () => void;
    onServiceCheck: (index: number) => void;
    serviceList: AdjustServices[];
    containerStyles?: {};
}) {
    return (
        <View style={[styles.expandableItemContainer, props.containerStyles]}>
            <Pressable
                style={styles.expandableItem}
                onPress={props.onClickFunction}
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
                    value={props.pieceTitle}
                    onChangeText={props.onChangePieceTitle}
                    marginBottom={10}
                />
                <TextInput
                    placeholder="Descrição (opcional)"
                    value={props.pieceDescription ? props.pieceDescription : ""}
                    onChangeText={props.onChangePieceDescription}
                    style={styles.itemDescription}
                    multiline={true}
                />
                <Text style={styles.expandableItemListText}>
                    Adicionar os ajustes solicitados (opcional)
                </Text>
                <RepairOrAdjustmentList
                    serviceList={props.serviceList}
                    onServiceCheck={props.onServiceCheck}
                />
            </View>
        </View>
    );
}

export function RepairOrAdjustmentList({
    serviceList,
    isSelectable = true,
    onServiceCheck,
}: {
    serviceList: AdjustServices[];
    onServiceCheck?: (index: number) => void;
    isSelectable?: boolean;
}) {

    return (
        <View style={styles.repairOrAdjustServiceList}>
            <View
                style={[
                    styles.repairOrAdjustServiceHeader,
                    !isSelectable && { paddingRight: 0 },
                ]}
            >
                <Text style={styles.headerColumnText}>Ajustes</Text>
                <Text style={styles.headerColumnText}>Valor</Text>
            </View>
            <View>
                {serviceList.map((service, index) => {
                    return (
                        <RepairOrAdjustmentServiceItem
                            key={index}
                            name={service.description}
                            cost={service.cost}
                            isChecked={service.isSelected}
                            onCheck={() => {
                                onServiceCheck && onServiceCheck(index);
                            }}
                            isSelectable={isSelectable}
                        />
                    );
                })}
            </View>
            <View
                style={[
                    styles.repairOrAdjustServiceFooter,
                    !isSelectable && { paddingRight: 0 },
                ]}
            >
                <Text style={styles.footerColumnText}>Total</Text>
                <Text style={styles.footerColumnText}>
                    R${" "}
                    {serviceList
                        .reduce((accumulator, adjust) => {
                            return adjust.isSelected
                                ? accumulator + adjust.cost
                                : accumulator;
                        }, 0)
                        .toFixed(2)
                        .replace(".", ",")}
                </Text>
            </View>
        </View>
    );
}

export function RepairOrAdjustmentServiceItem(props: {
    name: string;
    cost: number;
    isChecked: boolean;
    onCheck: () => void;
    isSelectable?: boolean;
}) {
    return (
        <View style={styles.serviceItemContainer}>
            <Text style={styles.serviceItemText}>{props.name}</Text>
            <View style={styles.serviceItemCostWrapper}>
                <Text style={styles.serviceItemText}>
                    R$ {props.cost.toFixed(2).padEnd(4, "0").replace(".", ",")}
                </Text>
                {props.isSelectable && (
                    <Pressable
                        onPress={props.onCheck}
                        style={[
                            styles.serviceItemCheckbox,
                            props.isChecked && {
                                backgroundColor: THEME.COLORS.PINK.V1,
                                borderWidth: 0,
                            },
                        ]}
                    >
                        {props.isChecked && (
                            <CheckIcon
                                width={14}
                                height={14}
                                color={THEME.COLORS.WHITE.FULL_WHITE}
                            />
                        )}
                    </Pressable>
                )}
            </View>
        </View>
    );
}
