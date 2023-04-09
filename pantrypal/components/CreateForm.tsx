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
      const submitItem = {
        name: newItem.name,
        expiry: newItem.expiry ? new Date(newItem.expiry).toISOString().split("T")[0] : "",
        type: newItem.type,
        notes: newItem.notes,
      };

      // Item does not exist in the database, create it
      setItems((items) => [...items, submitItem]);
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
          body: JSON.stringify(submitItem),
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
        placeholder="Expiry (YYYY-MM-DD)"
        value={newItem.expiry}
        onChange={(e) => setNewItem({ ...newItem, expiry: e.target.value })}
      />
      <Select
        className="type"
        value={newItem.type}
        onChange={(e) => setNewItem({ ...newItem, type: e.target.value as ItemType })}
      >
        <option
          style={{ color: "black" }}
          value="fruit"
        >
          Fruit
        </option>
        <option
          style={{ color: "black" }}
          value="vegetable"
        >
          Vegetable
        </option>
        <option
          style={{ color: "black" }}
          value="meat"
        >
          Meat
        </option>
        <option
          style={{ color: "black" }}
          value="dairy"
        >
          Dairy
        </option>
        <option
          style={{ color: "black" }}
          value="other"
        >
          Other
        </option>
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
