import { THEME } from "../../../../theme";
import { styles as modalStyles } from "../../../shared/ModalTemplate/styles";
import CreateModalIcon from "../../../../assets/icons/add-icon-with-border.svg";
import UserIcon from "../../../../assets/icons/user-icon-filled.svg";
import PhoneIcon from "../../../../assets/icons/phone-icon-filled.svg";

import { ModalTemplate } from "../../../shared/ModalTemplate";
import { Input } from "../../../shared/Input";
import { ModalAction } from "../../../shared/ModalTemplate/parts/ModalAction";

import { useViewController } from "./view-controller";

interface Props {
  callback: (customerId: number) => void;
}

export function CreateModal({ callback }: Props) {
  const viewController = useViewController({ callback });

  return (
    <ModalTemplate.Root>
      <ModalTemplate.Header
        backgroundColor={THEME.COLORS.BLUE}
        icon={CreateModalIcon}
      />

      <ModalTemplate.Container title="Cadastrar cliente">
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
            placeholder="Telefone"
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
          <ModalAction
            text="Cadastrar"
            additionalButtonStyles={{ backgroundColor: THEME.COLORS.BLUE }}
            additionalTextStyles={{ color: THEME.COLORS.WHITE.FULL_WHITE }}
            onPress={viewController.onCreateCustomer}
          />
        </ModalTemplate.Actions>
      </ModalTemplate.Container>
    </ModalTemplate.Root>
  );
}
