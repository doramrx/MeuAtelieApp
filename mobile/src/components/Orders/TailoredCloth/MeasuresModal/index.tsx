import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import EditIcon from "../../../../assets/icons/edit-icon-with-border.svg";

import { CustomerMeasureView } from "../../../../entities/Order";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { MeasureList } from "../../MeasureList";

import { useViewController } from "./view-controller";

interface Props {
  customerMeasures: CustomerMeasureView[];
  onUpdateCustomerMeasure: (id: number, value: string) => void;
  onFinishEditing: () => void;
}

export function MeasureListModal({
  customerMeasures,
  onUpdateCustomerMeasure,
  onFinishEditing,
}: Props) {
  const viewController = useViewController();

  return viewController.modalType === "MeasureList" ? (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        icon={EditIcon}
        backgroundColor={THEME.COLORS.PINK.V2}
      />

      <ModalTemplate.Container title="Editar medidas">
        <ModalTemplate.Content>
          <MeasureList
            data={customerMeasures}
            onUpdateMeasure={onUpdateCustomerMeasure}
            containerStyles={{ width: "100%" }}
          />
        </ModalTemplate.Content>

        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Cancelar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={viewController.onCloseModal}
          />
          <ModalTemplate.Action
            text="OK"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.PINK.V2 }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            onPress={onFinishEditing}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  ) : null;
}
