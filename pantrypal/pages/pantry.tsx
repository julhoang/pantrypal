import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { Item } from "@/lib/types";
import { Column } from "react-table";
import { Center } from "@chakra-ui/react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import ActionButtons from "@/components/ActionButtons";
import Navbar from "@/components/Navbar";

// upon page load, getStaticProps is called to fetch the data from the database
export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany();

  return {
    props: {
      items,
    },
  };
};

export default function Home({ items: initialItems }: { items: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [modifiedRow, setModifiedRow] = useState<Item | undefined>(undefined);

  // when user clicks edit, set the modifiedRow to the item that was clicked
  function onEdit(id: string) {
    setModifiedRow(items && items.find((item) => item.name === id));
  }

  // delete item from database
  // and update local state -> will not reload from prisma
  async function onDelete(name: string) {
    fetch("./api/deleteItem", {
      method: "DELETE",
      body: name,
    })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.name !== name));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  async function onSave() {
    if (modifiedRow) {
      fetch("./api/updateItem", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedRow),
      })
        .then(() => {
          setItems((prevItems) =>
            prevItems.map((item) => (item.name === modifiedRow.name ? modifiedRow : item))
          );
          setModifiedRow(undefined);
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
  }

  const columns: Column[] = useMemo(
    () => [
      { Header: "Name", accessor: "name", sortType: "basic", filter: "text" },
      { Header: "Expiry", accessor: "expiry", sortType: "basic", filter: "text" },
      { Header: "Type", accessor: "type", sortType: "basic", filter: "text" },
      { Header: "Notes", accessor: "notes", sortType: "basic", filter: "text" },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row }) => (
          <ActionButtons
            id={row.original.name}
            onEdit={onEdit}
            onDelete={() => onDelete(row.original.name)}
            modifiedRow={modifiedRow}
            setModifiedRow={setModifiedRow}
            onSave={onSave}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const data = useMemo(
    () =>
      items.map((item: Item) => ({
        ...item,
        id: item.name,
        expiry: item.expiry.split("T")[0],
        actions: (
          <ActionButtons
            id={item.name}
            onEdit={onEdit}
            onDelete={() => onDelete(item.name)}
            modifiedRow={modifiedRow}
            setModifiedRow={setModifiedRow}
            onSave={onSave}
          />
        ),
      })),
    [items, onEdit, onDelete]
  );

  return (
    <>
      <Header />
      <Navbar currentPage={"pantry"} />
      <Center>
        <Center
          border={"1px solid black"}
          w={"90%"}
          minW={900}
          maxW={1200}
        >
          <DataTable
            columns={columns}
            data={data}
            modifiedRow={modifiedRow}
            setModified={setModifiedRow}
            setItems={setItems}
          />
        </Center>
      </Center>
    </>
  );
}
