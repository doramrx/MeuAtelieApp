/* eslint-disable indent */
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../../../theme";
import CalendarIcon from "../../../../assets/icons/calendar-icon-filled.svg";

import { Input } from "../../../shared/Input";
import { MeasureList } from "../../MeasureList";

import { useViewController } from "./view-controller";
import { Fragment } from "react";
import { ChoosePhotoSourceModal } from "../ChoosePhotoSourceModal";
import { PhotoModal } from "../PhotoModal";
import { ModelPhotoList } from "../ModelPhotoList";

export function TailoredClothOrderForm() {
  const viewController = useViewController();

  return (
    <Fragment>
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Roupa sob medida</Text>
          <Text style={styles.text}>Adicionar detalhes da peça</Text>
          <Input
            placeholder="Título da peça"
            containerStyles={styles.input}
            value={viewController.title}
            onChangeText={viewController.onUpdateTitle}
          />
          <TextInput
            placeholder="Descrição (opcional)"
            style={styles.orderDescription}
            multiline={true}
            value={viewController.description}
            onChangeText={viewController.onUpdateDescription}
          />

          <Text style={styles.optionalFieldsText}>
            Adicionar fotos do modelo (opcional)
          </Text>

          <View style={styles.photoContainer}>
            <ModelPhotoList
              modelPhotos={viewController.modelPhotos}
              onSelectPhoto={viewController.onSelectPhoto}
              shouldShowAddPhotoButton={viewController.canAddMorePhotos()}
              onAddMorePhotos={viewController.onOpenBottomModal}
            />
          </View>

          <Text style={styles.optionalFieldsText}>
            Adicionar medidas do cliente (opcional)
          </Text>

          <MeasureList
            containerStyles={{ marginTop: 20 }}
            data={viewController.measures}
            onUpdateMeasure={viewController.onUpdateCustomerMeasure}
          />

          <View style={styles.serviceCostWrapper}>
            <Text style={styles.serviceCostlabel}>Custo do serviço:</Text>
            <Input
              placeholder="R$ 00,0"
              maxLength={8}
              keyboardType="numeric"
              value={viewController.cost}
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
                  return viewController.onUpdateCost("0,");
                }

                if (
                  text.length === 1 &&
                  dotCountInText === 1 &&
                  typedText === "."
                ) {
                  return viewController.onUpdateCost("0.");
                }

                if (commaCountInText <= 1 || dotCountInText <= 1) {
                  return viewController.onUpdateCost(text);
                }
              }}
            />
          </View>

          <View style={[styles.dueDateWrapper, { marginBottom: 20 }]}>
            <Text style={styles.dueDateLabel}>Selecione a data de entrega</Text>
            <Pressable
              style={styles.dueDatePicker}
              onPress={viewController.onOpenDateTimePicker}
            >
              <Text style={styles.dueDateValue}>
                {viewController.dueDate.toLocaleString("pt-BR")}
              </Text>
              <CalendarIcon
                width={22}
                height={22}
                color={THEME.COLORS.GRAY.LIGHT.V1}
              />
            </Pressable>
          </View>

          {/* <Text style={styles.serviceCountForDueDateText}>
            * Existem 6 serviços para serem entregues nesta data!
          </Text>

          <TouchableHighlight
            underlayColor={THEME.COLORS.GRAY.LIGHT.V2}
            onPress={viewController.onGoToAgenda}
            style={[styles.navigateToAgendaButton, styles.button]}
          >
            <Text style={[styles.buttonText, styles.navigateToAgendaText]}>
              Ir para a agenda
            </Text>
          </TouchableHighlight> */}

          <TouchableHighlight
            underlayColor={THEME.COLORS.PINK.V2_UNDERLAY}
            onPress={viewController.onCreateOrder}
            style={[styles.finishOrderButton, styles.button]}
          >
            <Text style={[styles.buttonText, styles.finishOrderText]}>
              Registrar pedido
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      {viewController.isBottomModalOpen &&
        viewController.modalType === "ImageSourceSelection" && (
          <ChoosePhotoSourceModal
            onChooseCameraSource={viewController.onChooseCameraSource}
            onChooseGallerySource={viewController.onChooseGallerySource}
          />
        )}
      {viewController.isModalOpen && (
        <PhotoModal
          onGetModelPhoto={viewController.onGetModelPhoto}
          onRemoveModelPhoto={viewController.onRemoveModelPhoto}
        />
      )}
    </Fragment>
  );
}
