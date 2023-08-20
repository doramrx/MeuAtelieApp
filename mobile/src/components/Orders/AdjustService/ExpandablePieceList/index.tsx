import { Fragment, useCallback, useState } from "react";
import { Text, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";

import { Input } from "../../../shared/Input";
import { ExpandablePiece } from "../ExpandablePiece";
import { AdjustItemData, AdjustList } from "../AdjustList";

export interface pieceData {
  title: string;
  description: string;
  adjustList: AdjustItemData[];
}

interface Props {
  mode: "Create" | "View" | "Update";
  pieces: pieceData[];
  setTitle?: (title: string, index: number) => void;
  setDescription?: (description: string, index: number) => void;
  setAdjusts?: (adjusts: AdjustItemData[], index: number) => void;
  getExpandedPiece?: (pieceIndex: number) => void;
}

export function ExpandablePieceList({
  mode,
  pieces,
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

  function toggleCheckedAdjust(adjusts: AdjustItemData[], index: number) {
    return adjusts.map((adjust, _index) => {
      return index === _index
        ? { ...adjust, isChecked: !adjust.isChecked }
        : adjust;
    });
  }

  useFocusEffect(
    useCallback(() => {
      setPiecesExpandedState(Array(pieces.length).fill(false));
    }, [pieces.length])
  );

  return (
    <Fragment>
      {pieces.map((piece, pieceIndex) => {
        return (
          <ExpandablePiece.Root key={pieceIndex}>
            <ExpandablePiece.Item
              itemName={`Peça (${pieceIndex + 1})`}
              onExpand={() => {
                handleTogglePiece(pieceIndex);
                getExpandedPiece && getExpandedPiece(pieceIndex);
              }}
            />

            <ExpandablePiece.Content
              isExpanded={piecesExpandedState[pieceIndex]}
            >
              <Input
                placeholder="Título"
                value={piece.title}
                onChangeText={(title) =>
                  setTitle && setTitle(title, pieceIndex)
                }
                containerStyles={{ marginBottom: 10 }}
                editable={mode === "Create" || mode === "Update"}
              />

              <TextInput
                placeholder="Descrição (opcional)"
                value={piece.description}
                onChangeText={(description) =>
                  setDescription && setDescription(description, pieceIndex)
                }
                style={styles.descriptionTextArea}
                multiline={true}
                editable={mode === "Create" || mode === "Update"}
              />

              <Text style={styles.adjustListText}>
                Adicionar os ajustes solicitados (opcional)
              </Text>

              <AdjustList
                items={piece.adjustList}
                isEditable={mode === "Create"}
                onSelectItem={(adjustIndex) => {
                  setAdjusts &&
                    setAdjusts(
                      toggleCheckedAdjust(piece.adjustList, adjustIndex),
                      pieceIndex
                    );
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
