import { useCallback, useState } from "react";
import {
    StatusBar,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
    Pressable,
    ViewStyle,
    StyleProp,
    Alert,
    PixelRatio,
    TextInput,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { styles } from "./styles";
import { THEME } from "../../theme";

import XIcon from "../../assets/icons/x-icon.svg";
import SearchIcon from "../../assets/icons/search-icon.svg";
import CheckIcon from "../../assets/icons/check-icon.svg";
import ArrowIcon from "../../assets/icons/arrow-icon.svg";
import UserIconFilled from "../../assets/icons/user-icon-filled.svg";
import PhoneIconFilled from "../../assets/icons/phone-icon-filled.svg";
import AddIconWithBorder from "../../assets/icons/add-icon-with-border.svg";
import PhotoIcon from "../../assets/icons/photo-icon.svg";
import CalendarIconFilled from "../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../components/shared/Input";
import { Card, CustomerProps } from "../../components/Customers/Card";
import { database } from "../../database/database";
import { ModalBuilder } from "../../components/shared/GenericModal/builder";
import { ScrollView } from "react-native-gesture-handler";

type ServiceSteps = "customer" | "details";
type CustomerMeasure = { name: string; value: string | null };
type ServiceData = {
    title: string;
    description: string;
    customerMeasures: CustomerMeasure[];
    cost: string;
    dueDate: Date;
};

export function TailoredClothes() {
    const navigation = useNavigation();

    const [currentStep, setCurrentStep] = useState<ServiceSteps>("customer");
    const [selectedCustomerId, setSelectedCustomerId] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function saveSelectedCustomerId(id: number) {
        setSelectedCustomerId(id);
        console.log(id);
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

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
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

    function saveServiceOrder(serviceData: ServiceData) {
        console.log(selectedCustomerId);
        console.log(serviceData.title);
        console.log(serviceData.description);
        console.log(serviceData.customerMeasures);
        console.log(serviceData.cost);
        console.log(serviceData.dueDate);

        database.transaction((transaction) => {
            transaction.executeSql(
                `
                INSERT INTO orders (title, description, cost, dueDate, type, createdAt) VALUES (?, ?, ?, ?, ?, ?);
            `,
                [
                    serviceData.title,
                    serviceData.description || null,
                    serviceData.cost,
                    serviceData.dueDate.toISOString(),
                    "Tailored",
                    new Date().toISOString(),
                ],
                (transaction, resultSet) => {
                    console.log("PEDIDO REGISTRADO COM SUCESSO!");
                    console.log(resultSet.insertId);

                    const insertedOrderId = resultSet.insertId;

                    if (insertedOrderId === undefined) {
                        return Alert.alert("Erro", "Não foi possível cadastrar um novo serviço!");
                    }

                    if (
                        serviceData.customerMeasures.length > 0
                    ) {
                        const sqlValuesStatement = serviceData.customerMeasures
                            .map((measure) => {
                                return `("${measure.name}", ${Number(
                                    measure.value?.replace(",", ".")
                                )}, ${selectedCustomerId}, ${insertedOrderId})`;
                            })
                            .join(",");

                        console.log(sqlValuesStatement);

                        transaction.executeSql(
                            `
                            INSERT INTO customer_measures (measure, value, id_customer, id_order) VALUES ${sqlValuesStatement};
                        `,
                            [],
                            (_, resultSet) => {
                                console.log(
                                    "MEDIDAS DO CLIENTE REGISTRADAS COM SUCESSO!"
                                );
                                console.log(resultSet.rowsAffected);
                                console.log(resultSet.insertId);

                                if (resultSet.insertId === undefined) {
                                    return Alert.alert("Erro", "Não foi possível cadastrar as medidas do cliente!");
                                }

                                Alert.alert("Sucesso", "Serviço cadastrado com sucesso!");

                                navigation.navigate("orders");
                            }
                        );
                    }
                }
            );
        });
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

            {isModalOpen && (
                <RegisterModal
                    isOpened={isModalOpen}
                    onActionSucceeded={() => {}}
                    onCloseModal={closeModal}
                />
            )}
        </View>
    );
}

function RadioGroup(props: {
    data: CustomerProps[];
    selectedCustomer: number;
    onSelectCustomer: (id: number) => void;
    containerStyle?: StyleProp<ViewStyle> | undefined;
}) {
    function onSelect(key: number): void {
        if (key !== props.selectedCustomer) {
            props.onSelectCustomer(key);
        }
    }

    return (
        <View style={props.containerStyle}>
            <FlatList
                data={props.data}
                style={{
                    marginBottom: 300,
                }}
                renderItem={({ item }) => (
                    <RadioButton
                        cardData={item}
                        isChecked={item.customerId === props.selectedCustomer}
                        checkButton={onSelect}
                    />
                )}
            />
        </View>
    );
}

function RadioButton(props: {
    cardData: CustomerProps;
    isChecked: boolean;
    checkButton: (id: number) => void;
}) {
    return (
        <Pressable onPress={() => props.checkButton(props.cardData.customerId)}>
            <Card
                key={props.cardData.customerId}
                customerId={props.cardData.customerId}
                customerName={props.cardData.customerName}
                customerPhone={props.cardData.customerPhone}
                marginBottom={8}
            />
            <View
                style={[
                    {
                        position: "absolute",
                        right: 15,
                        top: 20,
                        width: 35,
                        height: 35,
                        borderRadius: 35,
                        backgroundColor: THEME.COLORS.GRAY.LIGHT.V1,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    props.isChecked && {
                        backgroundColor: THEME.COLORS.PINK.V1,
                    },
                ]}
            >
                {props.isChecked && (
                    <CheckIcon
                        width={18}
                        height={18}
                        color={THEME.COLORS.WHITE.FULL_WHITE}
                    />
                )}
            </View>
        </Pressable>
    );
}

function RegisterModal(props: {
    isOpened: boolean;
    onCloseModal: () => void;
    onActionSucceeded: (customer: CustomerProps) => void;
}) {
    const pixelDensity = PixelRatio.get();

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
                            customerId: resultSet.insertId!,
                            customerName: name,
                            customerPhone: phone,
                        });
                        props.onCloseModal();
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

function Step1(props: {
    openModal: () => void;
    selectedCustomer: number;
    onSelectCustomer: (id: number) => void;
}) {
    const [customers, setCustomers] = useState<CustomerProps[]>([]);

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                transaction.executeSql(
                    `SELECT id, name, phone FROM customers;`,
                    undefined,
                    (_, resultSet) => {
                        const customerList = resultSet.rows._array.map(
                            (rawCustomerData) => {
                                return {
                                    customerId: rawCustomerData.id,
                                    customerName: rawCustomerData.name,
                                    customerPhone: rawCustomerData.phone,
                                };
                            }
                        );
                        setCustomers(customerList);
                    }
                );
            });
        }, [])
    );

    return (
        <>
            <Text style={styles.formTitle}>Roupa sob medida</Text>

            <TouchableHighlight
                style={styles.newCustomerButton}
                underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
                onPress={props.openModal}
            >
                <Text style={styles.newCustomerText}>
                    Cadastrar novo cliente
                </Text>
            </TouchableHighlight>

            <Text style={[styles.text, { marginBottom: 8 }]}>ou</Text>

            <Text style={styles.text}>Selecionar um cliente existente</Text>

            <Input
                leftIcon={
                    <SearchIcon
                        color={THEME.COLORS.GRAY.MEDIUM.V2}
                        width={24}
                        height={24}
                    />
                }
                placeholder="Pesquisar por um cliente"
                containerStyles={styles.input}
            />

            <RadioGroup
                data={customers}
                selectedCustomer={props.selectedCustomer}
                containerStyle={styles.customerList}
                onSelectCustomer={props.onSelectCustomer}
            />
        </>
    );
}

function Step2(props: { onFinishOrder: (serviceData: ServiceData) => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [measurementList, setMeasurementList] = useState<CustomerMeasure[]>([
        { name: "Abdômen", value: null },
        { name: "Busto", value: null },
        { name: "Cintura", value: null },
        { name: "Comprimento", value: null },
        { name: "Manga", value: null },
        { name: "Ombro", value: null },
        { name: "Punho", value: null },
        { name: "Quadril", value: null },
    ]);
    const [cost, setCost] = useState("");
    const [dueDate, setDueDate] = useState(new Date());

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

    function updateMeasureItem(index: number, newValue: string) {
        setMeasurementList((prevState) =>
            prevState.map((measure, measureIndex) => {
                return measureIndex === index
                    ? {
                          name: measure.name,
                          value: newValue.length === 0 ? null : newValue,
                      }
                    : measure;
            })
        );
    }

    function finishOrder() {
        props.onFinishOrder({
            title,
            description,
            customerMeasures: measurementList.filter(
                (item) => item.value !== null
            ),
            cost,
            dueDate,
        });
    }

    return (
        <ScrollView>
            <View style={styles.step2Wrapper}>
                <Text style={styles.formTitle}>Roupa sob medida</Text>
                <Text style={styles.text}>Adicionar detalhes da peça</Text>
                <Input
                    placeholder="Título da peça"
                    containerStyles={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    placeholder="Descrição (opcional)"
                    style={styles.orderDescription}
                    multiline={true}
                    value={description}
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
                    {/* <PhotoCard
                        index={2}
                        total={3}
                    />
                    <PhotoCard
                        index={3}
                        total={3}
                    /> */}
                </View>

                <Text style={styles.optionalFieldsText}>
                    Adicionar medidas do cliente (opcional)
                </Text>

                <View style={styles.measurementsList}>
                    {measurementList.map(({ name, value }, index) => {
                        return (
                            <MeasureItem
                                key={index}
                                index={index}
                                name={name}
                                value={value}
                                measurementUnit="cm"
                                onChangeMeasure={updateMeasureItem}
                            />
                        );
                    })}
                </View>

                <View style={styles.serviceCostWrapper}>
                    <Text style={styles.serviceCostlabel}>
                        Custo do serviço:
                    </Text>
                    <Input
                        placeholder="R$ 00,0"
                        maxLength={8}
                        keyboardType="numeric"
                        value={cost}
                        onChangeText={(text) => {
                            const commaCountInText = (text.match(/\,/g) || [])
                                .length;

                            if (text.charAt(text.length - 1) === ".") {
                                return;
                            }

                            if (text.length === 1 && commaCountInText === 1) {
                                return setCost("0,");
                            }

                            if (commaCountInText <= 1) {
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
                        onPress={() => {
                            console.log("Open date picker");
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
                    onPress={finishOrder}
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

function PhotoCard(props: { total: number; index: number }) {
    return (
        <TouchableOpacity style={styles.photoCard}>
            <PhotoIcon
                color={THEME.COLORS.GRAY.LIGHT.V1}
                width={35}
                height={35}
            />
            <Text style={styles.photoCardText}>
                {props.index}/{props.total}
            </Text>
        </TouchableOpacity>
    );
}

function MeasureItem(props: {
    index: number;
    name: string;
    value: string | null;
    measurementUnit: string;
    onChangeMeasure: (index: number, newValue: string) => void;
}) {
    return (
        <View style={styles.measureItem}>
            <Text style={styles.measureName}>{props.name}:</Text>
            <View style={styles.measurementValueWrapper}>
                <TextInput
                    placeholder="0,00"
                    placeholderTextColor={THEME.COLORS.GRAY.MEDIUM.V1}
                    keyboardType="numeric"
                    maxLength={5}
                    style={styles.measurementValue}
                    value={props.value ? props.value : ""}
                    onChangeText={(text) => {
                        const commaCountInText = (text.match(/\,/g) || [])
                            .length;

                        if (text.charAt(text.length - 1) === ".") {
                            return;
                        }

                        if (text.length === 1 && commaCountInText === 1) {
                            return props.onChangeMeasure(props.index, "0,");
                        }

                        if (commaCountInText <= 1) {
                            return props.onChangeMeasure(props.index, text);
                        }
                    }}
                />
                <Text style={styles.measurementUnit}>
                    {props.measurementUnit}
                </Text>
            </View>
        </View>
    );
}
