import React, { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { Item } from "@/lib/types";
import { Column } from "react-table";
import { Center, Container, Stack, Heading, Box } from "@chakra-ui/react";
import Header from "@/components/Header";
import DataTable from "@/components/DataTable";
import ActionButtons from "@/components/ActionButtons";
import Navbar from "@/components/Navbar";
import Overview from "@/components/Overview";
import CreateForm from "@/components/CreateForm";

// upon page load, getStaticProps is called to fetch the data from the database
export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany({
    orderBy: {
      expiry: "asc",
    },
  });

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
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));

    fetch("./api/deleteItem", {
      method: "DELETE",
      body: name,
    }).catch((error) => {
      alert("Error deleting item: " + name);
    });
  }

  // update item in database
  // and update local state -> will not reload from prisma
  async function onSave() {
    if (modifiedRow) {
      // check if expiry date is valid
      if (modifiedRow.expiry && isNaN(Date.parse(modifiedRow.expiry))) {
        alert("Please enter a valid expiry date in the format YYYY-MM-DD");
        return;
      }

      const name = modifiedRow.name;
      const date = modifiedRow.expiry
        ? new Date(modifiedRow.expiry).toISOString().split("T")[0]
        : "";

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.name === modifiedRow.name ? { ...modifiedRow, expiry: date } : item
        )
      );
      setModifiedRow(undefined);

      fetch("./api/updateItem", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifiedRow),
      }).catch((error) => {
        alert("Error updating item: " + name);
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
        name: item.name,
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

      <Container
        maxW="container.xl"
        marginTop={5}
      >
        <Stack spacing={10}>
          <Overview items={items} />
        </Stack>
      </Container>

      <Container
        maxW="container.xl"
        marginTop={10}
      >
        <Heading
          as={"h5"}
          marginBottom={"5"}
        >
          My Pantry
        </Heading>

        <Center
          bg={"grey.100"}
          marginTop={10}
          marginBottom={60}
        >
          <Center
            bg={"white"}
            borderRadius={10}
          >
            <DataTable
              columns={columns}
              data={data}
              modifiedRow={modifiedRow}
              setModified={setModifiedRow}
            />
          </Center>
        </Center>
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          height="75px"
          backgroundColor="gray.700"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={40}
        >
          <CreateForm
            data={items}
            setItems={setItems}
          />
        </Box>
      </Container>
    </>
  );
}
