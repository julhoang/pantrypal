import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { getExpiringItems } from "../pages/api/warningItems";

// test warning
test("expiring before today", async () => {
  const item: Item = {
    name: "olives-test",
    expiry: new Date().toLocaleDateString().slice(0, 10),
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

test("expiring before today", async () => {
  const item: Item = {
    name: "orange-test",
    expiry: new Date().toLocaleDateString().slice(0, 10),
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
