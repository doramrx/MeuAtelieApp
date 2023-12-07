import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useAppContext } from "../../../../hooks/useAppContext";

import { database } from "../../../../database/database";

import { styles } from "./styles";
import { styles as modalStyles } from "../../../../components/shared/ModalTemplate/styles";
import { THEME } from "../../../../theme";
import DetailModalIcon from "../../../../assets/icons/detail-icon-with-baloon-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";

interface Props {
  dressmakerName: string;
  dressmakerEmail: string;
}

export function DetailModal({ dressmakerEmail, dressmakerName }: Props) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const { closeModal } = useAppContext();

  // useFocusEffect(
  //   useCallback(() => {
  //     database.transaction((transaction) => {
  //       transaction.executeSql(
  //         "SELECT name, email FROM dressmakers WHERE id = ?;",
  //         [userId],
  //         (_, resultSet) => {
  //           setName(resultSet.rows.item(0).name);
  //           setEmail(resultSet.rows.item(0).email);
  //         }
  //       );
  //     });
  //   }, [])
  // );

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.BLUE}
        icon={DetailModalIcon}
      />

      <ModalTemplate.Container title="Editar perfil">
        <ModalTemplate.Content>
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.label}>E-mail:</Text>
            </View>

            <View>
              <Text style={styles.text}>{dressmakerName}</Text>
              <Text style={styles.text}>{dressmakerEmail}</Text>
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
