import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";

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
});

// test fetch item
test("fetch by name from the database", async () => {
  // fetch Apple
  const item = await prisma.item.create( {
  data:{  
    name: 'Apple',
    expiry: "",
    notes: "",
    type: '',
  },
  });

    const itemExpected = await prisma.item.create( {
  data:{ 
    name: 'Apple',
    expiry: "tomorrow",
    notes: "eat it",
    type: 'fruit',
  },
    });

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res).toEqual(itemExpected);
});
