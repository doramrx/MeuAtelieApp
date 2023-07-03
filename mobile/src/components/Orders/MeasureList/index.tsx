import { Text, TextInput, View } from "react-native";

import { THEME } from "../../../theme";
import { styles } from "./styles";

export type CustomerMeasure = { name: string; value: string | null };

export function MeasureList(props: {
    data: CustomerMeasure[];
    updateMeasureItemFn?: (index: number, newValue: string) => void;
    containerStyles?: {};
    editable?: boolean;
}) {
    return (
        <View style={[styles.measurementsList, props.containerStyles]}>
            {props.data.map(({ name, value }, index) => {
                return (
                    <MeasureItem
                        key={index}
                        index={index}
                        name={name}
                        value={value}
                        measurementUnit="cm"
                        onChangeMeasure={props.updateMeasureItemFn}
                        editable={props.editable}
                    />
                );
            })}
        </View>
    );
}

function MeasureItem(props: {
    index: number;
    name: string;
    value: string | null;
    measurementUnit: string;
    onChangeMeasure?: (index: number, newValue: string) => void;
    editable?: boolean;
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
                    editable={props.editable}
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
                            return (
                                props.onChangeMeasure &&
                                props.onChangeMeasure(props.index, "0,")
                            );
                        }

                        if (
                            text.length === 1 &&
                            dotCountInText === 1 &&
                            typedText === "."
                        ) {
                            return (
                                props.onChangeMeasure &&
                                props.onChangeMeasure(props.index, "0.")
                            );
                        }

                        if (commaCountInText <= 1 || dotCountInText <= 1) {
                            return (
                                props.onChangeMeasure &&
                                props.onChangeMeasure(props.index, text)
                            );
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
