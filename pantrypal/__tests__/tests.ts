import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { assert } from "node:console";

// test add item
test("add apple to the database", async () => {
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

  expect(dbItem).not.toBeNull();

  expect(res).toEqual(dbItem);
});
