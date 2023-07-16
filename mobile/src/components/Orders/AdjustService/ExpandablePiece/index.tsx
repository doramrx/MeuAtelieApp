import { useState } from "react";
import { Pressable, Text, TextInput, View, ViewStyle } from "react-native";

import { styles } from "./styles";

import { Input } from "../../../shared/Input";
import { AdjustItemData, AdjustList } from "../AdjustList";

export interface pieceData {
  title: string;
  description: string;
  adjustList: AdjustItemData[];
}

interface Props {
  itemName: string;
  containerStyles?: ViewStyle;
  isExpanded: boolean;
  onExpand: () => void;

  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  adjusts: AdjustItemData[];
  setAdjusts: (adjusts: AdjustItemData[]) => void;
}

export function ExpandablePiece({
  isExpanded = false,
  containerStyles,
  itemName,
  onExpand,
  title,
  setTitle,
  description,
  setDescription,
  adjusts,
  setAdjusts,
}: Props) {
  function handleSelectAdjust(index: number) {
    const selectedAdjusts = adjusts.map((adjust, _index) => {
      const isSelectedAdjust = index === _index;

      if (isSelectedAdjust) {
        return {
          ...adjust,
          isChecked: !adjust.isChecked,
        };
      }

      return adjust;
    });

    setAdjusts(selectedAdjusts);
  }

  return (
    <View style={[styles.container, containerStyles]}>
      <Pressable
        style={styles.expandButton}
        onPress={onExpand}
      >
        <Text style={styles.text}>{itemName}</Text>
        <View style={styles.triangleIcon} />
      </Pressable>

      <View
        style={[styles.contentWrapper, !isExpanded && styles.hiddenContent]}
      >
        <Input
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          containerStyles={{ marginBottom: 10 }}
        />

        <TextInput
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          style={styles.descriptionTextArea}
          multiline={true}
        />

        <Text style={styles.adjustListText}>
          Adicionar os ajustes solicitados (opcional)
        </Text>

        <AdjustList
          items={adjusts}
          isEditable={true}
          onSelectItem={handleSelectAdjust}
        />
      </View>
    </View>
  );
}
