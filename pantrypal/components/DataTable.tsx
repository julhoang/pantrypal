import React, { useState } from "react";
import {useTable, useFilters,useSortBy,useGlobalFilter,Column,} from "react-table";
import { Table,Thead,Tbody,Tr,Th,Td,Input,InputGroup,InputLeftAddon,Stack,Button,} from "@chakra-ui/react";
import { Item } from "@prisma/client";
import { createItem } from "@/pages/api/createItem";

export default function DataTable({
  columns,
  data,
  onCreateItem,
}: {
  columns: Column[];
  data: Item[];
  onCreateItem: (newItem: Item) => void;
}) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemExpiry, setNewItemExpiry] = useState("");
  const [newItemType, setNewItemType] = useState("");
  const [newItemNotes, setNewItemNotes] = useState("");

  const handleCreateItem = () => {
    const newItem = {
      name: newItemName,
      expiry: newItemExpiry,
      type: newItemType,
      notes: newItemNotes,
    };
  onCreateItem(newItem);
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



