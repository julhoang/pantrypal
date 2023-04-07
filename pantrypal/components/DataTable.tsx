import React, { useState } from "react";
import {useTable, useFilters,useSortBy,useGlobalFilter,Column,} from "react-table";
import { Table,Thead,Tbody,Tr,Th,Td,Input,InputGroup,InputLeftAddon,Stack,Button,} from "@chakra-ui/react";
import { Item } from "@prisma/client";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  async function handleCreateItem (){
    const newItem = {
      name: newItemName,
      expiry: newItemExpiry,
      type: newItemType,
      notes: newItemNotes,
    };
  await onCreate(newItem);
  setNewItemName("");
  setNewItemExpiry("");
  setNewItemType("");
  setNewItemNotes("");
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
          <Input
          placeholder="Type"
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value)}
        />
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