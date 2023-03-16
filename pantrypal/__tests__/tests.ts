import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { deleteItem } from "../pages/api/delete"
// test add item
test("add pinapple to the database", async () => {
  // create a new item in the database
  const item: Item = {
    name: "pinapple-test",
    expiry: "2021-12-31",
    notes: "this is a test",
    type: "fruit",
  };

  const res = await createItem(item);
  expect(res).not.toBeNull();

  const dbItem = await prisma.item.findUnique({
    where: {
      name: "pinapple-test",
    },
  });

  expect(res).toEqual(dbItem);

  // Delete the item created in this test
await prisma.item.delete({
  where: {
    name: item.name,
  },
});
});

test("add beef to the database", async () => {
  // create a new item in the database
  const item: Item = {
    name: "beef-test",
    expiry: "2021-12-31",
    notes: "this is a test",
    type: "fruit",
  };

  const res = await createItem(item);
  expect(res).not.toBeNull();

  const dbItem = await prisma.item.findUnique({
    where: {
      name: "beef-test",
    },
  });

  expect(res).toEqual(dbItem);

  // Delete the item created in this test
await prisma.item.delete({
  where: {
    name: item.name,
  },
});
});

test("add cheese to the database", async () => {
  // create a new item in the database
  const item: Item = {
    name: "cheese-test",
    expiry: "2021-12-31",
    notes: "this is a test",
    type: "fruit",
  };

  const res = await createItem(item);
  expect(res).not.toBeNull();

  const dbItem = await prisma.item.findUnique({
    where: {
      name: "cheese-test",
    },
  });

  expect(res).toEqual(dbItem);

  // Delete the item created in this test
await prisma.item.delete({
  where: {
    name: item.name,
  },
});
});


test("deleteItem", async () => {
  // Create a new item in the database
  const item2: Item = {
      name: "Mango",
      expiry: "tomorrow",
      notes: "eat it",
      type: "fruit",
    };
  
  // Delete the item
  await deleteItem(item2);

  // Check that the item no longer exists in the database
  const deletedItem = await prisma.item.findMany({
    where: {
      name: item2.name,
    },
  });

  console.log("newItem:", item2);
  console.log("deletedItem:", deletedItem);

  expect(deletedItem).toEqual([]);
});

