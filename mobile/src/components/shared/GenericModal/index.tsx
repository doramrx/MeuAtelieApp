import { ReactNode } from "react";
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    ScrollView,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";

export interface GenericModalProps {
    modalTitle: string;
    modalColor: string;
    modalIcon: ReactNode;
    closeModalText: string;
    closeModalButtonStyle?: "filled" | "transparent";
    actionButtonText?: string;
    isOpened: boolean;
    onCloseModal: () => void;
    onAction: () => void;
    children?: ReactNode;
}

export function GenericModal({
    modalTitle,
    modalIcon,
    modalColor,
    actionButtonText,
    closeModalText,
    closeModalButtonStyle = "transparent",
    isOpened,
    onCloseModal,
    onAction,
    children,
}: GenericModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpened}
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

                        <ScrollView
                            style={{
                                maxHeight: 380,
                            }}
                        >
                            {children}
                        </ScrollView>
                        <View style={styles.buttonsContainer}>
                            <TouchableHighlight
                                underlayColor={
                                    closeModalButtonStyle === "transparent"
                                        ? THEME.COLORS.GRAY.LIGHT.V2
                                        : modalColor
                                }
                                activeOpacity={0.5}
                                onPress={onCloseModal}
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
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.closeModalText,
                                        closeModalButtonStyle === "filled" && {
                                            color: THEME.COLORS.WHITE
                                                .FULL_WHITE,
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
                                    onPress={onAction}
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
