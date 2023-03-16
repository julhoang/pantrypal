import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { getExpiringItems } from "../pages/api/warningItems";

const today = new Date();

// test warning
test("expiring today -- should throw warning", async () => {
  const item: Item = {
    name: "chicken-test",
    expiry: today.toLocaleDateString().slice(0, 10).replace("/", "-"),
    notes: "this is a test",
    type: "other",
  };

  // create a new item in the database
  const newItem = await prisma.item.create({
    data: item,
  });

  // find all items that are expiring in 2 days
  const res = await getExpiringItems();

  expect(res).toContainEqual(item);

  // delete the item from the database
  await prisma.item.delete({
    where: {
      name: item.name,
    },
  });
});

test("expiring tomorrow -- should throw warning", async () => {
  const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
    .toLocaleDateString()
    .slice(0, 10)
    .replace("/", "-");

  const item: Item = {
    name: "orange-test",
    expiry: tomorrow,
    notes: "this is a test",
    type: "other",
  };

  // create a new item in the database
  const newItem = await prisma.item.create({
    data: item,
  });

  // find all items that are expiring in 2 days
  const res = await getExpiringItems();

  expect(res).toContainEqual(item);

  // delete the item from the database
  await prisma.item.delete({
    where: {
      name: item.name,
    },
  });
});

test("expiring yesterday -- should throw warning", async () => {
  const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
    .toLocaleDateString()
    .slice(0, 10)
    .replace("/", "-");

  const item: Item = {
    name: "olives-test",
    expiry: yesterday,
    notes: "this is a test",
    type: "other",
  };

  // create a new item in the database
  const newItem = await prisma.item.create({
    data: item,
  });

  // find all items that are expiring in 2 days
  const res = await getExpiringItems();

  expect(res).toContainEqual(item);

  // delete the item from the database
  await prisma.item.delete({
    where: {
      name: item.name,
    },
  });
});

test("expiring in 2 day -- should throw warning", async () => {
  const future = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
    .toLocaleDateString()
    .slice(0, 10)
    .replace("/", "-");

  const item: Item = {
    name: "tomato-test",
    expiry: future,
    notes: "this is a test",
    type: "other",
  };

  // create a new item in the database
  const newItem = await prisma.item.create({
    data: item,
  });

  // find all items that are expiring in 2 days
  const res = await getExpiringItems();

  expect(res).toContainEqual(item);

  // delete the item from the database
  await prisma.item.delete({
    where: {
      name: item.name,
    },
  });
});

test("expiring in 4 day -- should not throw warning", async () => {
  const future = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000)
    .toLocaleDateString()
    .slice(0, 10)
    .replace("/", "-");

  const item: Item = {
    name: "onion-test",
    expiry: future,
    notes: "this is a test",
    type: "other",
  };

  // create a new item in the database
  const newItem = await prisma.item.create({
    data: item,
  });

  // find all items that are expiring in 2 days
  const res = await getExpiringItems();

  expect(res).not.toContainEqual(item);

  // delete the item from the database
  await prisma.item.delete({
    where: {
      name: item.name,
    },
  });
});
