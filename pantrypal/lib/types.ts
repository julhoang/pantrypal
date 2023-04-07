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

export type recipeDisplayProps = {
  recipeList: any;
}