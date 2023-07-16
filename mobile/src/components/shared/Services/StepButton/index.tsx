import { Fragment } from "react";
import { Alert, Text, TouchableHighlight, View } from "react-native";

import { useOrderContext } from "../../../../hooks/useOrderContext";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import ArrowIcon from "../../../../assets/icons/arrow-icon.svg";

export function StepButton() {
  const { currentStep, selectedCustomerId, nextStep, previousStep } =
    useOrderContext();

  function moveToNextStep() {
    if (!selectedCustomerId) {
      return Alert.alert(
        "Erro",
        "Selecione um cliente para prosseguir para a próxima etapa!"
      );
    }

    nextStep();
  }

  function moveToPreviousStep() {
    previousStep();
  }

  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
      onPress={currentStep === 1 ? moveToNextStep : moveToPreviousStep}
    >
      <View style={{ width: "100%" }}>
        {currentStep === 1 ? (
          <Fragment>
            <Text style={styles.text}>Próximo</Text>
            <ArrowIcon
              color={THEME.COLORS.PINK.V1}
              width={25}
              height={25}
              style={styles.rightIcon}
            />
          </Fragment>
        ) : (
          <Fragment>
            <ArrowIcon
              color={THEME.COLORS.PINK.V1}
              width={25}
              height={25}
              style={styles.leftIcon}
            />
            <Text style={styles.text}>Voltar</Text>
          </Fragment>
        )}
      </View>
    </TouchableHighlight>
  );
}
