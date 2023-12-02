import { useCallback, useState } from "react";
import { Adjust, AdjustCheckBox, AdjustOrderItem } from "../entities/Order";
import { useAdjustAdapter } from "../adapters/adjustAdapter";
import { useFocusEffect } from "@react-navigation/native";

interface AdjustOrderItemData {
  items: AdjustOrderItem[];
  initItems: (amount: number, adjusts: Adjust[]) => void;
  updateItemTitle: (orderItemIndex: number, title: string) => void;
  updateItemDescription: (orderItemIndex: number, description: string) => void;
  updateItemAdjust: (itemIndex: number, adjustIndex: number) => void;
  getTotalCost: () => number;
  updateOrderItemAdjusts: (
    itemIndex: number,
    adjusts: AdjustCheckBox[]
  ) => void;
  setAdjustOrderItems: (items: AdjustOrderItem[]) => void;
}

interface ViewModelArgs {
  adjustOrderItems: AdjustOrderItem[];
}

export function useAdjustOrderItemViewModel(
  viewModelArgs?: ViewModelArgs
): AdjustOrderItemData {
  const adapter = useAdjustAdapter();
  const [items, setItems] = useState<AdjustOrderItem[]>([]);

  function initItems(amount: number, adjusts: Adjust[]) {
    const isInitialized = items.length > 0;

    if (!isInitialized) {
      initItemsWithoutData(amount, adjusts);
      return;
    }

    const isAmountEqualsToItemsLength = amount === items.length;

    if (isAmountEqualsToItemsLength) {
      return;
    }

    const isInsertingMoreItems = amount > items.length;

    if (isInsertingMoreItems) {
      const amountToAdd = amount - items.length;
      addNewItems(amountToAdd, adjusts);
    } else {
      const amountToRemove = items.length - amount;
      removeItems(amountToRemove);
    }
  }

  function initItemsWithoutData(amount: number, adjusts: Adjust[]) {
    const _items: AdjustOrderItem[] = [];

    for (let i = 0; i < amount; i++) {
      _items.push({
        id: null,
        title: "",
        description: "",
        adjusts: adapter.mapToAdjustCheckboxEntityList(adjusts),
      });
    }

    setItems(_items);
  }

  function addNewItems(amountToAdd: number, adjusts: Adjust[]) {
    setItems((prevItems) => {
      const _newItems: AdjustOrderItem[] = [];

      for (let i = 0; i < amountToAdd; i++) {
        _newItems.push({
          id: null,
          title: "",
          description: "",
          adjusts: adapter.mapToAdjustCheckboxEntityList(adjusts),
        });
      }

      return [...prevItems, ..._newItems];
    });
  }

  function removeItems(amountToRemove: number) {
    setItems((prevItems) => {
      const itemsCopy = [...prevItems];
      itemsCopy.splice(itemsCopy.length - amountToRemove, amountToRemove);
      return itemsCopy;
    });
  }

  function updateItemTitle(orderItemIndex: number, title: string) {
    setItems((prevItems) => {
      const itemsCopy = [...prevItems];
      itemsCopy[orderItemIndex].title = title;
      return itemsCopy;
    });
  }

  function updateItemDescription(orderItemIndex: number, description: string) {
    setItems((prevItems) => {
      const itemsCopy = [...prevItems];
      itemsCopy[orderItemIndex].description = description;
      return itemsCopy;
    });
  }

  function updateItemAdjust(itemIndex: number, adjustIndex: number) {
    setItems((prevItems) => {
      const itemsCopy = [...prevItems];
      const isAdjustChecked = itemsCopy[itemIndex].adjusts[adjustIndex].checked;
      itemsCopy[itemIndex].adjusts[adjustIndex].checked = !isAdjustChecked;
      return itemsCopy;
    });
  }

  function getTotalCost() {
    return items.reduce((total, item) => {
      const checkedItems = item.adjusts.filter((adjust) => adjust.checked);

      return (
        total +
        checkedItems.reduce((subtotal, adjust) => subtotal + adjust.cost, 0)
      );
    }, 0);
  }

  function updateOrderItemAdjusts(
    itemIndex: number,
    adjusts: AdjustCheckBox[]
  ) {
    setItems((prevItems) => {
      const itemsCopy = [...prevItems];
      itemsCopy[itemIndex].adjusts = adjusts;
      return itemsCopy;
    });
  }

  useFocusEffect(
    useCallback(() => {
      if (!viewModelArgs) {
        return;
      }

      setItems(viewModelArgs.adjustOrderItems);
    }, [])
  );

  return {
    items,
    initItems,
    updateItemTitle,
    updateItemDescription,
    updateItemAdjust,
    getTotalCost,
    updateOrderItemAdjusts,
    setAdjustOrderItems: setItems,
  };
}
