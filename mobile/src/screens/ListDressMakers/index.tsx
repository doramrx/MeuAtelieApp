import { useCallback, useContext, useRef, useState } from "react";
import { FlatList, StatusBar, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Card } from "../../components/ListDressMakers/Card/index";
import { BottomModal } from "../../components/shared/BottomModal";

import DetailIconWithBaloonBorder from "../../assets/icons/detail-icon-with-baloon-border.svg";

import { styles } from "./styles";
import { THEME } from "../../theme";

import { database } from "../../database/database";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalBuilder } from "../../components/shared/GenericModal/builder";

interface Dressmaker {
    id: number;
    name: string;
    phoneNumber: string;
}

export function ListDressMakers() {
    const { userId } = useContext(AuthContext);

    const paginationLimit = 20;
    const pageRef = useRef(1);
    const haveMoreRecordsRef = useRef(true);

    const [dressmakers, setDressmakers] = useState<Dressmaker[]>([]);
    const [keyForRefreshing, setKeyForRefreshing] = useState(0);
    const [id, setId] = useState(-1);

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isBottomModalOpened, setIsBottomModalOpened] = useState(false);

    function openModal() {
        setIsModalOpened(true);
    }

    function handleOpenDetailsModal() {
        handleCloseBottomModal();
        openModal();
    }

    function forceScreenUpdate() {
        setKeyForRefreshing(keyForRefreshing + 1);
    }

    function handleOpenBottomModal(id: number) {
        setId(id);
        setIsBottomModalOpened(true);
    }

    function handleCloseBottomModal() {
        setIsBottomModalOpened(false);
    }

    function handleCloseModal() {
        setIsModalOpened(false);
    }

    useFocusEffect(
        useCallback(() => {
            database.transaction((transaction) => {
                const offset = (pageRef.current - 1) * paginationLimit;

                transaction.executeSql(
                    `SELECT id, name 
                    FROM dressmakers 
                    WHERE NOT id = ? 
                    ORDER BY id
                    LIMIT ${paginationLimit}
                    OFFSET ${offset}
                    ;`,
                    [userId],
                    (_, resultSet) => {
                        const rawResultSet = resultSet.rows._array;

                        if (rawResultSet.length === 0) {
                            // console.log("Não existem mais registros");
                            haveMoreRecordsRef.current = false;
                            return;
                        }

                        const newDressmakersList: Dressmaker[] =
                            rawResultSet.map((result) => {
                                return {
                                    id: result.id,
                                    name: result.name,
                                    phoneNumber: result.phoneNumber,
                                };
                            });

                        setDressmakers([...dressmakers, ...newDressmakersList]);
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
                <Text style={styles.title}>Costureiras</Text>
            </View>

            <View style={styles.mainContainer}>
                <FlatList
                    data={dressmakers}
                    renderItem={({ item, index }) => {
                        return index < dressmakers.length ? (
                            <Card
                                key={item.id}
                                dressmakerId={item.id}
                                onOptionsClick={handleOpenBottomModal}
                                dressmakerName={item.name}
                                marginBottom={6}
                            />
                        ) : (
                            <Card
                                key={item.id}
                                dressmakerId={item.id}
                                onOptionsClick={handleOpenBottomModal}
                                dressmakerName={item.name}
                            />
                        );
                    }}
                    onEndReached={() => {
                        if (haveMoreRecordsRef.current) {
                            pageRef.current = pageRef.current + 1;
                            forceScreenUpdate();
                        }
                    }}
                />
            </View>

            {isModalOpened && (
                <DetailModal
                    userId={id}
                    isOpened={isModalOpened}
                    onCloseModal={handleCloseModal}
                    refreshPageFunction={forceScreenUpdate}
                />
            )}

            {isBottomModalOpened && (
                <BottomModal
                    onDetailOption={handleOpenDetailsModal}
                    onCloseModal={handleCloseBottomModal}
                />
            )}
        </View>
    );
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
