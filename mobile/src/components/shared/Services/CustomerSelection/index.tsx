import { Fragment } from "react";
import { Text, TouchableHighlight } from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import SearchIcon from "../../../../assets/icons/search-icon.svg";

import { Input } from "../../Input";
import { Modal } from "../../../Customers/Modal";
import { RadioGroup } from "../../../Orders/TailoredCloth/RadioGroup";
import { useViewController } from "./view-controller";

interface Props {
  title: string;
}

export function CustomerSelection({ title }: Props) {
  const viewController = useViewController();

  return (
    <Fragment>
      <Text style={styles.title}>{title}</Text>

      <TouchableHighlight
        style={styles.button}
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={viewController.onOpenCreateModal}
      >
        <Text style={styles.textButton}>Cadastrar novo cliente</Text>
      </TouchableHighlight>

      <Text style={[styles.text, { marginBottom: 8 }]}>ou</Text>

      <Text style={[styles.text, { marginBottom: 18 }]}>Selecionar um cliente existente</Text>
      {/* <Input
        icon={SearchIcon}
        placeholder="Pesquisar por um cliente"
        containerStyles={styles.input}
      /> */}

      <RadioGroup
        customerData={viewController.customers}
        onEndReached={viewController.onMoveNextPage}
        containerStyles={styles.customerList}
      />

      {viewController.isModalOpen && (
        <Modal
          callback={() => {
            // Todo
          }}
        />
      )}
    </Fragment>
  );
}
