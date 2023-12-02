import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import { THEME } from "../../../../theme";
import EditIcon from "../../../../assets/icons/edit-icon-with-border.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { AdjustList } from "../AdjustList";
import { AdjustCheckBox } from "../../../../entities/Order";
import { useViewController } from "./view-controller";

interface Props {
  orderAdjusts: AdjustCheckBox[];
  onGetAdjusts: (adjusts: AdjustCheckBox[]) => void;
}

export function AdjustListModal({ orderAdjusts, onGetAdjusts }: Props) {
  const viewController = useViewController({
    adjusts: orderAdjusts,
    onGetAdjusts,
  });

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        icon={EditIcon}
        backgroundColor={THEME.COLORS.PINK.V2}
      />

      <ModalTemplate.Container title="Editar ajustes">
        <ModalTemplate.Content>
          <AdjustList
            adjusts={viewController.adjusts}
            onSelectItem={viewController.onToggleAdjust}
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
            onPress={viewController.onGetAdjusts}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
