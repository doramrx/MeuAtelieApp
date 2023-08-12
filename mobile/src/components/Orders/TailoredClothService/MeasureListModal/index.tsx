import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { database } from "../../../../database/database";
import { useAppContext } from "../../../../hooks/useAppContext";

import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../../components/shared/ModalTemplate/styles";
import EditIcon from "../../../../assets/icons/edit-icon-with-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { MeasureList } from "../../MeasureList";
import { CustomerMeasureData } from "../TailoredClothOrderDetail/DetailMode";

interface Props {
  customerMeasures: CustomerMeasureData[];
  getMeasures: (measures: CustomerMeasureData[]) => void;
}

export function MeasureListModal({ customerMeasures, getMeasures }: Props) {
  const { closeModal, modalType } = useAppContext();

  const [measures, setMeasures] = useState<CustomerMeasureData[]>();

  function fetchCustomerMeasures() {
    database.transaction((transaction) => {
      const measuresToExclude = customerMeasures
        .map((measure) => {
          return measure.id;
        })
        .join(",");

      transaction.executeSql(
        `SELECT id, measure FROM customer_measures WHERE id NOT IN (${measuresToExclude});`,
        undefined,
        (_, resultSet) => {
          const fetchedCustomerMeasures: CustomerMeasureData[] =
            resultSet.rows._array.map((row) => {
              return {
                orderMeasureId: null,
                id: row.id,
                name: row.measure,
                value: row.value || null,
              };
            });

          setMeasures(
            [...customerMeasures, ...fetchedCustomerMeasures].sort(
              (a, b) => a.id - b.id
            )
          );
        }
      );
    });
  }

  function updateMeasure(index: number, value: string) {
    setMeasures((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return prevState.map((measure, _index) => {
        return _index === index ? { ...measure, value } : measure;
      });
    });
  }

  function handleGetMeasures() {
    if (!measures) {
      return;
    }

    measures.forEach((measure) => console.log(measure));

    getMeasures(
      measures.filter(
        (measure) => measure.value !== null && measure.value !== ""
      )
    );
    closeModal();
  }

  useFocusEffect(
    useCallback(() => {
      fetchCustomerMeasures();
    }, [])
  );

  if (!measures) {
    return null;
  }

  return modalType === "MeasureList" ? (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        icon={EditIcon}
        backgroundColor={THEME.COLORS.PINK.V2}
      />

      <ModalTemplate.Container title="Editar medidas">
        <ModalTemplate.Content>
          <MeasureList
            data={measures}
            updateMeasureItemFn={updateMeasure}
            containerStyles={{ width: "100%" }}
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
  ) : null;
}
