import React from "react";
import { InputGroup, Input, Select, Button } from "@chakra-ui/react";
import { Item, ItemType } from "@/lib/types";

export default function CreateForm({
  newItem,
  setNewItem,
  handleCreateItem,
}: {
  newItem: Item;
  setNewItem: React.Dispatch<React.SetStateAction<Item>>;
  handleCreateItem: () => void;
}) {
  return (
    <InputGroup>
      <Input
        className="itemname"
        placeholder="Item name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <Input
        className="expiry"
        placeholder="Expiry"
        value={newItem.expiry}
        onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
      />
      <Select
        className="type"
        placeholder="Type"
        value={newItem.type}
        onChange={(e) => setNewItem({ ...newItem, type: e.target.value as ItemType })}
      >
        <option value="fruit">Fruit</option>
        <option value="vegetable">Vegetable</option>
        <option value="meat">Meat</option>
        <option value="dairy">Dairy</option>
        <option value="other">Other</option>
      </Select>
      <Input
        className="notes"
        placeholder="Notes"
        value={newItem.notes}
        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
      />
      <Button
        className="create"
        paddingX={8}
        paddingY={4}
        onClick={handleCreateItem}
      >
        Add Item
      </Button>
    </InputGroup>
  );
}
