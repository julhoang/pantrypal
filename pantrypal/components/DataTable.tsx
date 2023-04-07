import React, { useState } from "react";
import {useTable, useFilters,useSortBy,useGlobalFilter,Column,} from "react-table";
import { Table,Thead,Tbody,Tr,Th,Td,Input,InputGroup,InputLeftAddon,Stack,Button, Select,} from "@chakra-ui/react";
import { Item } from "@prisma/client";

async function onCreate(item: Item) {
  try {
    const response = await fetch("/api/createItem", {
      method: "POST", 
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        name: item.name,
        expiry: item.expiry,
        notes: item.notes,
        type: item.type,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create item");
    }
    const createdItem: Item = await response.json();
    console.log("Created item:", createdItem);
  } catch (error) {
    console.error("Error creating item:", error);
  }
}

// async function onFetch(item:Item){
//   try {
//     const response = await fetch(`/api/fetchItem`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch item");
//     }
//     const item: Item = await response.json();
//     console.log("Fetched item:", item);
//     return item;
//   } catch (error) {
//     console.error("Error fetching item:", error);
//   }
// }
async function onFetch(item: Item) {
  const response = await fetch(`/api/fetchItem?name=${item.name}&expiry=${item.expiry}&type=${item.type}`);
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
}: {
  columns: Column[];
  data: Item[];
  // onCreate: (newItem: Item) => void;
}) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemExpiry, setNewItemExpiry] = useState("");
  const [newItemType, setNewItemType] = useState("");
  const [newItemNotes, setNewItemNotes] = useState("");

async function handleCreateItem () {
  const newItem = {
    name: newItemName,
    expiry: newItemExpiry,
    type: newItemType,
    notes: newItemNotes,
  };
  
  const existingItems = await onFetch(newItem);
  console.log("this is the existing item:", existingItems);
  const itemExists = existingItems.some(item => item.name === newItem.name);
  if (itemExists){
    // Item already exists in the database, show a warning message
    alert('Item already exists in the database');
  } else {
    // Item does not exist in the database, create it
    await onCreate(newItem);
    setNewItemName("");
    setNewItemExpiry("");
    setNewItemType("");
    setNewItemNotes("");
  }
};
  
  const { getTableProps, getTableBodyProps,headerGroups,rows,prepareRow,state,setGlobalFilter,} 
    = useTable({ columns,data,},useFilters,useGlobalFilter,useSortBy );

  const { globalFilter } = state;

  return (
    <Stack spacing={4} w={800}>
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
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
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
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    
      {/* New Item Form */}
      <InputGroup>
        <Input
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Input
          placeholder="Expiry"
          value={newItemExpiry}
          onChange={(e) => setNewItemExpiry(e.target.value)}
        />
        {/* <DatePicker
  selected={newItemExpiry}
  onChange={(date) => setNewItemExpiry(date)}
  placeholderText="Expiry"
/> */}
          {/* <Input
          placeholder="Type"
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value)}
        /> */}
        <Select
  placeholder="Type"
  value={newItemType}
  onChange={(e) => setNewItemType(e.target.value)}
>
  <option value="fruit">Meat</option>
  <option value="vegetable">Fruit</option>
  <option value="meat">Meat</option>
  <option value="dairy">Dairy</option>
  <option value="other">Other</option>
</Select>
          <Input
          placeholder="Notes"
          value={newItemNotes}
          onChange={(e) => setNewItemNotes(e.target.value)}
        />
        <Button padding={8} onClick={handleCreateItem}>Create Item</Button>
      </InputGroup>
    </Stack>
  );
}


// async function handleCreateItem (){
  //     const newItem = {
  //       name: newItemName,
  //       expiry: newItemExpiry,
  //       type: newItemType,
  //       notes: newItemNotes,
  //     };
  //   await onCreate(newItem);
  //   setNewItemName("");
  //   setNewItemExpiry("");
  //   setNewItemType("");
  //   setNewItemNotes("");
  // };