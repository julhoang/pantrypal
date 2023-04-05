import React from "react";
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
} from "@chakra-ui/react";
import { Item } from "@prisma/client";

export default function DataTable({ columns, data }: { columns: Column[]; data: Item[] }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <Stack
      spacing={4}
      w={800}
    >
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
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
    </Stack>
  );
}
