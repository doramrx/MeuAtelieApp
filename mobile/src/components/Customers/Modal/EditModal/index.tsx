import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import EditModalIcon from "../../../../assets/icons/edit-icon-with-border.svg";
import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import PhoneIcon from "../../../../assets/icons/phone-icon-filled.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { Input } from "../../../shared/Input";
import { useViewController } from "./view-controller";

interface Props {
  customerId: number;
  callback: (customerId: number) => void;
}

export function EditModal({ customerId, callback }: Props) {
  const viewController = useViewController({ customerId, callback });

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.PINK.V2}
        icon={EditModalIcon}
      />
      <ModalTemplate.Container title="Editar">
        <ModalTemplate.Content>
          <Input
            value={viewController.customerName}
            onChangeText={viewController.onCustomerNameChange}
            placeholder="Nome"
            icon={UserIcon}
            containerStyles={{ marginBottom: 14 }}
          />
          <Input
            value={viewController.customerPhone}
            onChangeText={viewController.onCustomerPhoneChange}
            placeholder="Email"
            icon={PhoneIcon}
            containerStyles={{ marginBottom: 14 }}
          />
        </ModalTemplate.Content>
        <ModalTemplate.Actions>
          <ModalTemplate.Action
            text="Fechar"
            additionalButtonStyles={modalStyles.closeButton}
            additionalTextStyles={modalStyles.closeButtonText}
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={viewController.onCloseModal}
          />
          <ModalTemplate.Action
            text="OK"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.PINK.V2 }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            onPress={viewController.onEdit}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
