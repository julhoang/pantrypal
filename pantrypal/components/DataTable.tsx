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
  Select,
} from "@chakra-ui/react";
import { Item } from "@/lib/types";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

export default function DataTable({
  columns,
  data,
  modifiedRow,
  setModified,
}: {
  columns: Column[];
  data: Item[];
  modifiedRow: Item | undefined;
  setModified: React.Dispatch<React.SetStateAction<Item | undefined>>;
}) {
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
      direction="column"
      border="1px solid #e2e8f0"
      borderRadius="md"
      borderTop={0}
    >
      {/* Search Bar */}
      <InputGroup>
        <InputLeftAddon
          borderBottomRadius={0}
          children="Search"
        />
        <Input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          id="searchBar"
          placeholder="Search by name, expiry, type, or notes"
          borderBottomRadius={0}
        />
      </InputGroup>

      {/* Table */}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  style={{ lineHeight: "1.2" }}
                  width={column.width}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      column.id !== "actions" && <FaSort />
                    )}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                id={"row-" + row.original.name}
              >
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
    </Stack>
  );
}
