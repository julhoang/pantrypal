import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { Column } from "react-table";
import { Center } from "@chakra-ui/react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import ActionButtons from "@/components/ActionButtons";

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

  function onEdit(id: string) {
    console.log("edit", id);
  }

  // delete item from database
  // and update local state -> will not reload from prisma
  async function onDelete(id: string) {
    fetch("./api/deleteItem", {
      method: "DELETE",
      body: id,
    })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.name !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
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
            id={row.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const data = useMemo(
    () =>
      items.map((item: Item, index: number) => ({
        ...item,
        id: item.name,
        actions: (
          <ActionButtons
            id={item.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      })),
    [items, onEdit, onDelete]
  );

  return (
    <Center>
      <Header />
      <Center
        border={"1px solid black"}
        w={"90%"}
        minW={900}
        maxW={1200}
      >
        <DataTable
          columns={columns}
          data={data}
        />
      </Center>
    </Center>
  );
}
