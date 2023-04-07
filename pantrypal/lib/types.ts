export type Item = {
  name: string;
  expiry: string;
  notes: string;
  type: ItemType;
};

export type ItemType = "fruit" | "vegetable" | "meat" | "dairy" | "other" | "****";

export type resType = {
  name: string;
  expiry: string;
  notes: string;
  type: string;
}[];

export type ActionButtonsProps = {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  modifiedRow: Item | undefined;
  setModifiedRow: React.Dispatch<React.SetStateAction<Item | undefined>>;
};
