import React, { useState } from "react";
import { InputGroup, Input, Select, Button } from "@chakra-ui/react";
import { Item, ItemType } from "@/lib/types";

export default function CreateForm({
  data,
  setItems,
}: {
  data: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const [newItem, setNewItem] = useState<Item>({
    name: "",
    expiry: "",
    type: "other",
    notes: "",
  });

  async function handleCreateItem() {
    if (newItem.expiry && isNaN(Date.parse(newItem.expiry))) {
      alert("Please enter a valid expiry date in the format YYYY-MM-DD");
      return;
    }

    const existingItems = data;
    const itemExists = existingItems.some((item) => item.name === newItem.name);

    if (itemExists) {
      alert(newItem.name + " already exists in the database");
    } else {
      // Item does not exist in the database, create it
      setItems((items) => [...items, newItem]);
      setNewItem({
        name: "",
        expiry: "",
        type: "other",
        notes: "",
      });

      try {
        await fetch("/api/createItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      } catch (error) {
        alert("Error creating item: " + newItem.name);
      }
    }
  }

  return (
    <InputGroup gap={5}>
      <Input
        className="itemname"
        placeholder="Item name (required)"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        autoFocus
      />
      <Input
        className="expiry"
        placeholder="Expiry (optional)"
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
        placeholder="Notes (optional)"
        value={newItem.notes}
        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
      />
      <Button
        paddingX={10}
        paddingY={4}
        onClick={handleCreateItem}
        bgGradient="linear(to-r, #00ff87, #60efff)"
        color="black"
        width={"md"}
        isDisabled={newItem.name === ""}
        className="create"
      >
        Add Item
      </Button>
    </InputGroup>
  );
}
