import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import {fetchItem}  from "../pages/api/fetch";

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

    const itemExpected: Item = {
    name: "beef-test",
    expiry: "2021-12-31",
    notes: "this is a test",
    type: "fruit",
  };

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res[0]).toEqual(itemExpected);
});

test("fetch by expiry from the database", async () => {
  // fetch Apple
    const item: Item = {
    name: "****",
    expiry: "2023-03-15",
    notes: "****",
    type: "****",
  };

    const itemExpected: Item = {
    name: "eggs",
    expiry: "2023-03-15",
    notes: "expiring tmr",
    type: "meat",
  };

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res[0]).toEqual(itemExpected);
});

test("fetch by type from the database", async () => {
  // fetch Apple
    const item: Item = {
    name: "****",
    expiry: "****",
    notes: "****",
    type: "other",
  };

    const itemExpected: Item = {
    name: "olives-test",
    expiry: "2023-03-16",
    notes: "Green",
    type: "other",
  };

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res[0]).toEqual(itemExpected);
});

test("fetch multiple items from the database and sort by expiry", async () => {
  // fetch Apple
    const item: Item = {
    name: "****",
    expiry: "****",
    notes: "****",
    type: "meat",
  };

  let itemExpected: { name: string, expiry: string, notes: string, type: string }[] = [
      { "name": "eggs", "expiry": "2023-03-15", "notes": "expiring tmr", "type": "meat"},
      { "name": "butter", "expiry": "2023-03-19", "notes": "expiring in 5 days", "type": "meat"}
  ];

  const res = await fetchItem(item);
  expect(res).not.toBeNull();

  expect(res.sort()).toEqual(itemExpected.sort());
});
