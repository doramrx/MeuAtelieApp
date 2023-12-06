import { Fragment } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../../theme";
import UpdateIcon from "../../../../../assets/icons/update-icon.svg";
import CalendarIcon from "../../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../../shared/Input";
import { MeasureList } from "../../../MeasureList";
import { MeasureListModal } from "../../MeasuresModal";
import { TailoredClothOrder } from "../../../../../entities/Order";
import { useViewController } from "./view-controller";
import { ModelPhotoList } from "../../ModelPhotoList";
import { PhotoModal } from "../../PhotoModal";
import { ChoosePhotoSourceModal } from "../../ChoosePhotoSourceModal";

interface Props {
  orderId: number;
  orderData: TailoredClothOrder;
  onTriggerFetchOrderData: () => Promise<void>;
}

export function EditMode({
  orderId,
  orderData,
  onTriggerFetchOrderData,
}: Props) {
  const viewController = useViewController({
    orderId,
    tailoredClothOrder: orderData,
    onTriggerFetchOrderData,
  });

  return (
    <Fragment>
      <Text style={styles.title}>Roupa sob medida</Text>

      <Text style={styles.subtitle}>Detalhes da peça</Text>

      <Input
        placeholder="Título da peça"
        containerStyles={styles.input}
        value={viewController.tailoredClothOrder.title}
        onChangeText={viewController.onChangeTitle}
      />

      <TextInput
        placeholder="Descrição (opcional)"
        style={styles.textarea}
        multiline={true}
        value={viewController.tailoredClothOrder.description}
        onChangeText={viewController.onChangeDescription}
      />

      <Text style={styles.text}>Adicionar fotos do modelo (opcional)</Text>

      <View style={styles.photoContainer}>
        <ModelPhotoList
          modelPhotos={viewController.modelPhotos}
          onSelectPhoto={viewController.onSelectPhoto}
          shouldShowAddPhotoButton={viewController.canAddMorePhotos()}
          onAddMorePhotos={viewController.onOpenBottomModal}
        />
      </View>

      <Text style={styles.text}>
        {viewController.tailoredClothOrder.measures.length === 0
          ? "Adicionar medidas do cliente (opcional)"
          : "Atualizar medidas do cliente (opcional)"}
      </Text>

      <MeasureList
        containerStyles={{ marginTop: 20 }}
        data={viewController.onGetCustomerMeasures()}
        editable={false}
      />

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V1}
        onPress={viewController.onOpenMeasureListModal}
        style={[styles.button, styles.updateMeasurementsButton]}
      >
        <View style={styles.updateMeasurementsContent}>
          <UpdateIcon
            color={THEME.COLORS.GRAY.MEDIUM.V1}
            width={20}
            height={20}
          />
          <Text style={styles.measuresText}>
            {viewController.tailoredClothOrder.measures.length === 0
              ? "Adicionar medidas"
              : "Atualizar medidas"}
          </Text>
        </View>
      </TouchableHighlight>

      <View style={styles.serviceCostWrapper}>
        <Text style={styles.serviceCostlabel}>Custo do serviço:</Text>
        <Input
          placeholder="R$ 00,0"
          maxLength={8}
          keyboardType="numeric"
          value={viewController.inputCost}
          onChangeText={(text) => {
            const typedText = text.charAt(text.length - 1);
            const commaCountInText = (text.match(/,/g) || []).length;
            const dotCountInText = (text.match(/\./g) || []).length;

            if (commaCountInText >= 1 && dotCountInText >= 1) {
              return;
            }

            if (
              (typedText === "." && dotCountInText > 1) ||
              (typedText === "," && commaCountInText > 1)
            ) {
              return;
            }

            if (
              text.length === 1 &&
              commaCountInText === 1 &&
              typedText === ","
            ) {
              return viewController.onChangeCost("0,");
            }

            if (
              text.length === 1 &&
              dotCountInText === 1 &&
              typedText === "."
            ) {
              return viewController.onChangeCost("0.");
            }

            if (commaCountInText <= 1 || dotCountInText <= 1) {
              return viewController.onChangeCost(text);
            }
          }}
        />
      </View>

      <View style={styles.dueDateWrapper}>
        <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>
        <Pressable
          style={styles.dueDatePicker}
          onPress={viewController.onOpenDatePicker}
        >
          <Text style={styles.dueDateValue}>
            {viewController.tailoredClothOrder.dueDate.toLocaleString("pt-BR")}
          </Text>
          <CalendarIcon
            width={22}
            height={22}
            color={THEME.COLORS.GRAY.LIGHT.V1}
          />
        </Pressable>
      </View>

      <Text style={styles.serviceCountForDueDateText}>
        * Existem 6 serviços para serem entregues nesta data!
      </Text>

      <TouchableHighlight
        underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
        onPress={viewController.onSave}
        style={[styles.saveOrderButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.saveOrderText]}>
          Salvar alterações
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
        onPress={viewController.onCancel}
        style={[styles.cancelButton, styles.button]}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>Cancelar</Text>
      </TouchableHighlight>

      {viewController.isModalOpen && (
        <MeasureListModal
          customerMeasures={viewController.customerMeasures}
          onUpdateCustomerMeasure={viewController.onUpdateCustomerMeasure}
          onFinishEditing={viewController.onFinishEdition}
        />
      )}
      {viewController.isModalOpen && (
        <PhotoModal
          onGetModelPhoto={viewController.onGetModelPhoto}
          onRemoveModelPhoto={viewController.onRemoveModelPhoto}
        />
      )}
      {viewController.isBottomModalOpen && (
        <ChoosePhotoSourceModal
          onChooseCameraSource={viewController.onChooseCameraSource}
          onChooseGallerySource={viewController.onChooseGallerySource}
        />
      )}
    </Fragment>
  );
}
