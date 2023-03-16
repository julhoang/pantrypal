import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { fetchItem } from "../pages/api/fetch";

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
  const item: Item = {
    name: "beef-test",
    expiry: "****",
    notes: "****",
    type: "****",
  };

  let itemExpected: { name: string; expiry: string; notes: string; type: string }[] = [
    { name: "beef-test", expiry: "2021-12-31", notes: "this is a test", type: "fruit" },
  ];

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res).toEqual(itemExpected);
});

test("fetch by expiry from the database", async () => {
  // fetch Apple
  const item: Item = {
    name: "****",
    expiry: "2023-03-15",
    notes: "****",
    type: "****",
  };

  let itemExpected: { name: string; expiry: string; notes: string; type: string }[] = [
    { name: "eggs", expiry: "2023-03-15", notes: "expiring tmr", type: "meat" },
  ];

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res).toEqual(itemExpected);
});

test("fetch by type from the database", async () => {
  // fetch Apple
  const item: Item = {
    name: "****",
    expiry: "****",
    notes: "****",
    type: "other",
  };

  let itemExpected: { name: string; expiry: string; notes: string; type: string }[] = [
    { name: "olive", expiry: "2023-03-16", notes: "Green", type: "other" },
  ];

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res).toEqual(itemExpected);
});

test("fetch multiple items from the database and sort by expiry", async () => {
  // fetch Apple
  const item: Item = {
    name: "****",
    expiry: "****",
    notes: "****",
    type: "meat",
  };

  let itemExpected: { name: string; expiry: string; notes: string; type: string }[] = [
    { name: "eggs", expiry: "2023-03-15", notes: "expiring tmr", type: "meat" },
    { name: "butter", expiry: "2023-03-19", notes: "expiring in 5 days", type: "meat" },
  ];

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res).toEqual(itemExpected);
});

test("cleaning up test cases", async () => {
  const items = await prisma.item.deleteMany({
    where: {
      name: {
        contains: "-test",
      },
    },
  });
});
