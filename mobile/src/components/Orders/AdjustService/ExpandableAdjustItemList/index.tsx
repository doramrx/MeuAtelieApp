import { Fragment, useCallback, useState } from "react";
import { Text, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";

import { Input } from "../../../shared/Input";
import { ExpandablePiece } from "../ExpandablePiece";
import { AdjustList } from "../AdjustList";
import { AdjustOrderItem } from "../../../../entities/Order";

interface Props {
  mode: "Create" | "View" | "Update";
  items: AdjustOrderItem[];
  setTitle?: (index: number, title: string) => void;
  setDescription?: (index: number, description: string) => void;
  setAdjusts?: (itemIndex: number, adjustIndex: number) => void;
  getExpandedPiece?: (pieceIndex: number) => void;
}

export function ExpandableAdjustItemList({
  mode,
  items,
  setTitle,
  setDescription,
  setAdjusts,
  getExpandedPiece,
}: Props) {
  const [piecesExpandedState, setPiecesExpandedState] = useState<boolean[]>([]);

  function handleTogglePiece(index: number) {
    setPiecesExpandedState((prevStates) => {
      return prevStates.map((state, _index) => {
        return index === _index ? !state : false;
      });
    });
  }

  useFocusEffect(
    useCallback(() => {
      setPiecesExpandedState(Array(items.length).fill(false));
    }, [items.length])
  );

  return (
    <Fragment>
      {items.map((item, itemIndex) => {
        return (
          <ExpandablePiece.Root key={itemIndex}>
            <ExpandablePiece.Item
              itemName={`Peça (${itemIndex + 1})`}
              onExpand={() => {
                handleTogglePiece(itemIndex);
                getExpandedPiece && getExpandedPiece(itemIndex);
              }}
            />

            <ExpandablePiece.Content
              isExpanded={piecesExpandedState[itemIndex]}
            >
              <Input
                placeholder="Título"
                value={item.title}
                onChangeText={(title) => setTitle && setTitle(itemIndex, title)}
                containerStyles={{ marginBottom: 10 }}
                editable={mode === "Create" || mode === "Update"}
              />

              <TextInput
                placeholder="Descrição (opcional)"
                value={item.description}
                onChangeText={(description) =>
                  setDescription && setDescription(itemIndex, description)
                }
                style={styles.descriptionTextArea}
                multiline={true}
                editable={mode === "Create" || mode === "Update"}
              />

              <Text style={styles.adjustListText}>
                Adicionar os ajustes solicitados (opcional)
              </Text>

              <AdjustList
                adjusts={item.adjusts}
                isEditable={mode === "Create"}
                onSelectItem={(adjustIndex) => {
                  setAdjusts && setAdjusts(itemIndex, adjustIndex);
                }}
              />
              {mode === "Update" && <ExpandablePiece.UpdateButton />}
            </ExpandablePiece.Content>
          </ExpandablePiece.Root>
        );
      })}
    </Fragment>
  );
}
