import { useCallback, useState } from "react";
import { useAppContext } from "../../../../hooks/useAppContext";

import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import { THEME } from "../../../../theme";
import EditIcon from "../../../../assets/icons/edit-icon-with-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { AdjustItemData, AdjustList } from "../AdjustList";
import { database } from "../../../../database/database";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  orderAdjusts: AdjustItemData[];
  getSelectedAdjusts: (adjusts: AdjustItemData[]) => void;
}

export function AdjustListModal({ orderAdjusts, getSelectedAdjusts }: Props) {
  const { closeModal } = useAppContext();

  const [adjusts, setAdjusts] = useState<AdjustItemData[]>([]);

  function fetchAdjusts() {
    database.transaction((transaction) => {
      const orderAdjustIDs = orderAdjusts
        .map((adjust) => {
          return adjust.id;
        })
        .join(",");

      transaction.executeSql(
        `SELECT id, description, cost FROM adjust_services WHERE id NOT IN (${orderAdjustIDs});`,
        undefined,
        (_, resultSet) => {
          const fetchedAdjusts: AdjustItemData[] = resultSet.rows._array.map(
            (row) => {
              return {
                id: row.id,
                description: row.description,
                cost: row.cost,
                isChecked: false,
              };
            }
          );

          setAdjusts(
            [...orderAdjusts, ...fetchedAdjusts].sort((a, b) => a.id - b.id)
          );
        }
      );
    });
  }

  function toggleSelectedAdjust(index: number) {
    setAdjusts((prevAdjusts) => {
      return prevAdjusts.map((_adjust, _index) => {
        return index === _index
          ? { ..._adjust, isChecked: !_adjust.isChecked }
          : _adjust;
      });
    });
  }

  function handleGetMeasures() {
    getSelectedAdjusts(adjusts.filter((adjust) => adjust.isChecked));
    closeModal();
  }

  useFocusEffect(
    useCallback(() => {
      fetchAdjusts();
    }, [])
  );

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        icon={EditIcon}
        backgroundColor={THEME.COLORS.PINK.V2}
      />

      <ModalTemplate.Container title="Editar ajustes">
        <ModalTemplate.Content>
          <AdjustList
            items={adjusts}
            onSelectItem={toggleSelectedAdjust}
          />
        </ModalTemplate.Content>
        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Cancelar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={closeModal}
          />
          <ModalTemplate.Action
            text="OK"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.PINK.V2 }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            onPress={handleGetMeasures}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
