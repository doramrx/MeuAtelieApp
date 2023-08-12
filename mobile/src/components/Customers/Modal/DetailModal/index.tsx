import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";

import { useAppContext } from "../../../../hooks/useAppContext";

import { THEME } from "../../../../theme";
import { styles } from "./styles";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import DetailModalIcon from "../../../../assets/icons/detail-icon-with-baloon-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";

interface Props {
  customerId: number;
}

export function DetailModal({ customerId }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { closeModal } = useAppContext();

  useFocusEffect(
    useCallback(() => {
      database.transaction((transaction) => {
        transaction.executeSql(
          "SELECT name, phone FROM customers WHERE id = ?;",
          [customerId],
          (_, resultSet) => {
            setName(resultSet.rows.item(0).name);
            setPhone(resultSet.rows.item(0).phone);
          }
        );
      });
    }, [])
  );

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.BLUE}
        icon={DetailModalIcon}
      />

      <ModalTemplate.Container title="Detalhes">
        <ModalTemplate.Content>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.label}>Telefone:</Text>
            </View>
            <View>
              <Text style={styles.text}>{name}</Text>
              <Text style={styles.text}>{phone}</Text>
            </View>
          </View>
        </ModalTemplate.Content>
        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Fechar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={closeModal}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
