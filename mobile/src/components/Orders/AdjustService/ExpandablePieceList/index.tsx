import { Fragment, SetStateAction, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { ExpandablePiece, pieceData } from "../ExpandablePiece";
import { AdjustItemData } from "../AdjustList";

interface Props {
  pieces: pieceData[];
  setPieces: (pieces: SetStateAction<pieceData[]>) => void;
}

export function ExpandablePieceList({ pieces, setPieces }: Props) {
  const [piecesExpandedState, setPiecesExpandedState] = useState<boolean[]>([]);

  function handleTogglePiece(index: number) {
    setPiecesExpandedState((prevStates) => {
      return prevStates.map((state, _index) => {
        return index === _index ? !state : false;
      });
    });
  }

  function setTitle(title: string, index: number) {
    setPieces((prevPieces) => {
      const piecesCopy = [...prevPieces];
      piecesCopy[index].title = title;
      return piecesCopy;
    });
  }

  function setDescription(description: string, index: number) {
    setPieces((prevPieces) => {
      const piecesCopy = [...prevPieces];
      piecesCopy[index].description = description;
      return piecesCopy;
    });
  }

  function setAdjusts(adjusts: AdjustItemData[], index: number) {
    setPieces((prevPieces) => {
      const piecesCopy = [...prevPieces];
      piecesCopy[index].adjustList = adjusts;
      return piecesCopy;
    });
  }

  useFocusEffect(
    useCallback(() => {
      setPiecesExpandedState(Array(pieces.length).fill(false));
    }, [pieces.length])
  );

  return (
    <Fragment>
      {pieces.map((data, index) => {
        return (
          <ExpandablePiece
            key={index}
            itemName={`Peça (${index + 1})`}
            isExpanded={piecesExpandedState[index]}
            onExpand={() => handleTogglePiece(index)}
            title={pieces[index].title}
            setTitle={(title) => setTitle(title, index)}
            description={pieces[index].description}
            setDescription={(description) => setDescription(description, index)}
            adjusts={pieces[index].adjustList}
            setAdjusts={(adjusts) => setAdjusts(adjusts, index)}
          />
        );
      })}
    </Fragment>
  );
}
