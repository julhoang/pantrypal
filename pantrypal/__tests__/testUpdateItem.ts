import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import updateItem  from "../pages/api/updateItem";



test("update item name", async () => {
    //change item name milk to milk-new
    const item: Item = {
    name: "milk",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "dairy",
  };

   const newItem: Item = {
    name: "milk-new",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "dairy",
  };

  const res = await updateItem(item, newItem);

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk-new",
    },
  });

  expect(res).toEqual(dbItem);
});

test("update item expiry, type and notes", async () => {
    //change item expiry to 2023-03-20, notes to: expiring in 10 days and type to: other and the name to milk
    const item: Item = {
    name: "milk-new",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "fruit",
  };

   const newItem: Item = {
    name: "milk",
    expiry: "2023-03-20",
    notes: "expiring in 10 days",
    type: "other",
  };

  const res = await updateItem(item, newItem);

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk",
    },
  });

  expect(res).toEqual(dbItem);
});

test("reseting the entry milk", async () => {
    const item: Item = {
    name: "milk",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "fruit",
  };

   const newItem: Item = {
    name: "milk",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "dairy",
  };

  const res = await updateItem(item, newItem);

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk",
    },
  });

  expect(res).toEqual(dbItem);
});