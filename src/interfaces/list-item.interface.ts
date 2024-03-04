export interface ListItem {
  index: number;
  item: any;
  editedItem: any;
  count: number;
  editable: boolean;
  config?: any;
  onEdit: (item: any) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (item: any) => void;
  onChangeField: (e: {
    target: { name: string; value: any; type: string };
  }) => void;
  onChangeSelect: (item: any, name: string) => void;
}

export interface ListNewItem {
  newItem: any;
  editable: boolean;
  config?: any;
  onChangeField: (e: { target: { name: any; value: any; type: any } }) => void;
  onChangeSelect: (item: any, name: string) => void;
  onSave: () => void;
  onDiscard: () => void;
}
