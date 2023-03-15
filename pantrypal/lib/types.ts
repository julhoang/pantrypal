export type Item = {
  name: string;
  expiry: string;
  notes: string;
  type: ItemType;
};

export type ItemType = "fruit" | "vegetable" | "meat" | "dairy" | "other" | "****";
