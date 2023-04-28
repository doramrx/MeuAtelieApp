import { ReactNode, useState } from "react";
import { Text, View, Modal, TouchableHighlight } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

interface Props {
    modalTitle: string;
    modalColor: string;
    modalIcon: ReactNode;
    closeModalText: string;
    closeModalButtonStyle?: "filled" | "transparent";
    actionButtonText?: string;
    children?: ReactNode;
}

export function CustomModal({
    modalTitle,
    modalIcon,
    modalColor,
    actionButtonText,
    closeModalText,
    closeModalButtonStyle = "transparent",
    children,
}: Props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View
                        style={[styles.header, { backgroundColor: modalColor }]}
                    >
                        {modalIcon}
                    </View>

                    <View style={styles.main}>
                        <Text style={styles.title}>{modalTitle}</Text>

                        {children}

                        <View style={styles.buttonsContainer}>
                            <TouchableHighlight
                                underlayColor={
                                    closeModalButtonStyle === "transparent"
                                        ? THEME.COLORS.GRAY.LIGHT.V2
                                        : modalColor
                                }
                                activeOpacity={0.5}
                                onPress={() => {
                                    setIsOpen(false);
                                }}
                                style={[
                                    styles.button,
                                    actionButtonText !== undefined && {
                                        marginRight: 10,
                                    },
                                    styles.closeModalButton,
                                    closeModalButtonStyle === "filled" && {
                                        borderWidth: 0,
                                        backgroundColor: modalColor,
                                    },
                                    actionButtonText === undefined && {
                                        flex: 0,
                                        width: 130,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.closeModalText,
                                        closeModalButtonStyle === "filled" && {
                                            color: THEME.COLORS.WHITE.FULL_WHITE,
                                        },
                                    ]}
                                >
                                    {closeModalText}
                                </Text>
                            </TouchableHighlight>
                            {actionButtonText && (
                                <TouchableHighlight
                                    underlayColor={modalColor}
                                    activeOpacity={0.5}
                                    onPress={() => {}}
                                    style={[
                                        styles.button,
                                        { backgroundColor: modalColor },
                                    ]}
                                >
                                    <Text style={[styles.buttonText]}>
                                        {actionButtonText}
                                    </Text>
                                </TouchableHighlight>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
