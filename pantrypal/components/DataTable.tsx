import React, { useState } from "react";
import { useTable, useFilters, useSortBy, useGlobalFilter, Column } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Button,
  Select,
} from "@chakra-ui/react";
import { Item, ItemType } from "@/lib/types";

async function onCreate(item: Item) {
  try {
    await fetch("/api/createItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: item.name,
        expiry: item.expiry,
        notes: item.notes,
        type: item.type,
      }),
    });
  } catch (error) {
    console.error("Error creating item:", error);
  }
}

async function onFetch(item: Item) {
  const response = await fetch(
    `/api/fetchItem?name=${item.name}&expiry=${item.expiry}&type=${item.type}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }
  const items: Item[] = await response.json();
  console.log("Fetched items:", items);
  return items;
}

export default function DataTable({
  columns,
  data,
  modifiedRow,
  setModified,
  setItems,
}: {
  columns: Column[];
  data: Item[];
  modifiedRow: Item | undefined;
  setModified: React.Dispatch<React.SetStateAction<Item | undefined>>;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemExpiry, setNewItemExpiry] = useState("");
  const [newItemType, setNewItemType] = useState("");
  const [newItemNotes, setNewItemNotes] = useState("");

  async function handleCreateItem() {
    const newItem: Item = {
      name: newItemName,
      expiry: newItemExpiry,
      type: newItemType as ItemType,
      notes: newItemNotes,
    };

    const existingItems = await onFetch(newItem);
    const itemExists = existingItems.some((item) => item.name === newItem.name);
    if (itemExists) {
      // Item already exists in the database, show a warning message
      alert("Item already exists in the database");
    } else {
      // Item does not exist in the database, create it
      await onCreate(newItem);
      setItems((items) => [...items, newItem]);
      setNewItemName("");
      setNewItemExpiry("");
      setNewItemType("");
      setNewItemNotes("");
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <Stack
      spacing={4}
      w={1200}
    >
      {/* Search Bar */}
      <InputGroup>
        <InputLeftAddon children="Search" />
        <Input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          id="searchBar"
        />
      </InputGroup>

      {/* Table */}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  // if this is the first column, render the row with the edit/delete buttons
                  if (index === row.cells.length - 1 || index === 0) {
                    // if this is the last column, render the regular cell content
                    return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
                  }

                  // if this is the Expiry column, render the date picker
                  if (index === 1) {
                    return (
                      <Td {...cell.getCellProps()}>
                        {modifiedRow && modifiedRow.name === cell.row.original.name ? (
                          <Input
                            defaultValue={cell.value}
                            size="sm"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="gray.200"
                            autoFocus
                            onChange={(e) => {
                              const updatedRow: Item = {
                                ...modifiedRow,
                                [cell.column.id]: e.target.value,
                              };
                              setModified(updatedRow);
                            }}
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </Td>
                    );
                  }

                  // if this is the Type column, render the select dropdown
                  if (index === 2) {
                    return (
                      <Td {...cell.getCellProps()}>
                        {modifiedRow && modifiedRow.name === cell.row.original.name ? (
                          <Select
                            defaultValue={cell.value}
                            size="sm"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="gray.200"
                            autoFocus
                            onChange={(e) => {
                              const updatedRow: Item = {
                                ...modifiedRow,
                                [cell.column.id]: e.target.value,
                              };
                              setModified(updatedRow);
                            }}
                          >
                            <option value="fruit">Fruit</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="meat">Meat</option>
                            <option value="dairy">Dairy</option>
                            <option value="bread">Bread</option>
                            <option value="other">Other</option>
                          </Select>
                        ) : (
                          cell.render("Cell")
                        )}
                      </Td>
                    );
                  }

                  return (
                    <Td {...cell.getCellProps()}>
                      {modifiedRow && modifiedRow.name === cell.row.original.name ? (
                        <Input
                          defaultValue={cell.value}
                          size="sm"
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor="gray.200"
                          autoFocus
                          onChange={(e) => {
                            const updatedRow: Item = {
                              ...modifiedRow,
                              [cell.column.id]: e.target.value,
                            };
                            setModified(updatedRow);
                          }}
                        />
                      ) : (
                        cell.render("Cell")
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {/* New Item Form */}
      <InputGroup>
        <Input
          className="itemname"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Input
          className="expiry"
          placeholder="Expiry"
          value={newItemExpiry}
          onChange={(e) => setNewItemExpiry(e.target.value)}
        />
        <Select
          className="type"
          placeholder="Type"
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value)}
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
          value={newItemNotes}
          onChange={(e) => setNewItemNotes(e.target.value)}
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
    </Stack>
  );
}
