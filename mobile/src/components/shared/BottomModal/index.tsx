import {
    TouchableWithoutFeedback,
    TouchableHighlight,
    Modal,
    Text,
    View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../theme";
import DetailIcon from "../../../assets/icons/bottom-modal-detail-icon.svg";
import EditIcon from "../../../assets/icons/bottom-modal-edit-icon.svg";
import DeleteIcon from "../../../assets/icons/bottom-modal-delete-icon.svg";

interface Props {
    onCloseModal: () => void;
    onDetailOption: () => void;
    onEditOption?: () => void;
    onDeleteOption?: () => void;
}

export function BottomModal(props: Props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={props.onCloseModal}>
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <TouchableHighlight
                            style={[styles.button, styles.firstButton]}
                            onPress={props.onDetailOption}
                            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                        >
                            <View style={styles.buttonContentWrapper}>
                                <DetailIcon
                                    width={34}
                                    height={34}
                                    color={THEME.COLORS.GRAY.DARK.V3}
                                />
                                <Text style={styles.buttonText}>Detalhes</Text>
                            </View>
                        </TouchableHighlight>

                        {props.onEditOption && (
                            <TouchableHighlight
                                style={styles.button}
                                onPress={props.onEditOption}
                                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                            >
                                <View style={styles.buttonContentWrapper}>
                                    <EditIcon
                                        width={34}
                                        height={34}
                                        color={THEME.COLORS.GRAY.DARK.V3}
                                    />
                                    <Text style={styles.buttonText}>
                                        Editar
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )}

                        {props.onDeleteOption && (
                            <TouchableHighlight
                                style={[styles.button, styles.lastButton]}
                                onPress={props.onDeleteOption}
                                underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
                            >
                                <View style={styles.buttonContentWrapper}>
                                    <DeleteIcon
                                        width={34}
                                        height={34}
                                        color={THEME.COLORS.GRAY.DARK.V3}
                                    />
                                    <Text style={styles.buttonText}>
                                        Deletar
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
