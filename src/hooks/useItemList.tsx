import { useEffect, useState } from 'react';
import useUpdateRecord from './useUpdateRecord';
import createRecord from '../services/create.service';
import deleteRecord from '../services/delete.service';

// Custom hook for managing lists of items
const useItemList = (
  modelName: string,
  initialItems: any[],
  initialItem: any
) => {
  const [newLineEnabled, setNewLineEnabled] = useState(false);
  const [editedItem, setEditedItem] = useState(initialItem);
  const [updatedItem, setUpdatedItem] = useState({
    id: undefined,
  });
  const [items, setItems] = useState(new Array(0));
  const [newItem, setNewItem] = useState(initialItem);
  const updateRecord = useUpdateRecord(modelName);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const resetNewItem = () => setNewItem(initialItem);

  const enableNewLine = () => {
    setNewLineEnabled(true);
    resetNewItem();
  };

  const updateItems = (updatedItems: any[]) => {
    setItems(updatedItems);
  };

  const handleItemFieldChange = (e: {
    target: { name: any; value: any; type: any };
  }) => {
    const { name, value, type } = e.target;

    setNewItem((prevItem: any) => ({
      ...prevItem,
      [name]: type === 'date' ? new Date(value) : (type === 'number') ? parseFloat(value) : value,
    }));
  };



  const handleItemSelectChange = (selectedItem: any, name: string) => {
    setNewItem((prevItem: any) => ({
      ...prevItem,
      [name]: {
        connect: {
          id: selectedItem.id,
        },
      },
      // [name]: selectedItem.id,
    }));
  };
  const updateEditedItem = (updatedFields: any) => {
    if (editedItem?.id !== null) {
      const updatedEditedItem = {
        ...editedItem,
        ...updatedFields,
      };

      const updatedItems = items.map((item) =>
        item.id === editedItem?.id ? updatedEditedItem : item
      );

      updateItems(updatedItems);
      setEditedItem(updatedEditedItem);
      setUpdatedItem({
        ...updatedItem,
        ...updatedFields,
      });
    }
  };

  const handleEditedItemFieldChange = (e: {
    target: { name: any; value: any; type: any };
  }) => {
    const { name, value, type } = e.target;
    updateEditedItem({
      [name]: type === 'date' ? new Date(value) : (type === 'number') ? parseFloat(value) : value,
    });
  };

  const handleEditedItemSelectChange = (selectedItem: any, name: string) => {
    updateEditedItem({
      [name]: {
        connect: {
          id: selectedItem.id,
        },
      },
    });
  };

  const handleSaveChanges = async () => {
    const addedItem = await createRecord({
      modelName,
      data: {
        ...newItem,
      },
    });

    setNewLineEnabled(false);
    const updatedItems = [...items, addedItem];

    // Update the data object with the new items list
    updateItems(updatedItems);

    // Example: Call your setToastData function here

    resetNewItem();
  };

  const handleDiscardChanges = () => {
    setNewLineEnabled(false);
    resetNewItem();
  };

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter((item: any) => item.id !== itemId);

    // Update the data object with the new items list
    updateItems(updatedItems);

    // Optionally, you can return the updated items list
    return updatedItems;
  };

  const handleEditItem = (item: any) => {
    // store the initial edited item values in case we need to discard changes later and use these values
    setEditedItem(item);
  };

  const handleSaveEditedItem = async () => {
    if (editedItem?.id !== null) {
      // Find the index of the edited item in the items array
      const editedIndex = items.findIndex(
        (item: any) => item.id === editedItem?.id
      );

      // Create a copy of the items array to modify
      const updatedItems = [...items];

      // Update the specific item with the edited data
      updatedItems[editedIndex] = editedItem;

      // Update the data object with the new items list
      updateItems(updatedItems);

      console.log('----> updatedItem');
      console.log(updatedItem);
      await updateRecord.mutateAsync({
        modelName,
        recordId: editedItem?.id, // Record ID
        updates: updatedItem, // Update data
      });

      // Reset the editedItem to null
      setEditedItem(null);
      setUpdatedItem({ id: undefined });

      // Optionally, you can clear the newItem state
      resetNewItem();
    }
  };

  const handleCancelEdit = () => {
    if (editedItem?.id !== null) {
      // reset items list to the initial items state
      updateItems(initialItems);

      // Reset the editedItem to null
      setEditedItem(null);
      setUpdatedItem({ id: undefined });
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteRecord({
        modelName,
        id,
      });

      setNewLineEnabled(false);
      removeItem(id);
    } catch (error) {
      // Handle error
    }
  };

  return {
    newLineEnabled,
    editedItem,
    newItem,
    items,
    enableNewLine,
    handleItemFieldChange,
    handleItemSelectChange,
    handleEditedItemFieldChange,
    handleEditedItemSelectChange,
    handleSaveChanges,
    handleDiscardChanges,
    handleEditItem,
    handleSaveEditedItem,
    handleCancelEdit,
    handleDeleteItem,
    updateEditedItem,
    setNewItem,
  };
};

export default useItemList;
