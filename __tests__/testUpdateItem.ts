import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import {createItem} from "../pages/api/createItem";
import { updateItem } from "../pages/api/updateItem";

test("update item expiry, type and notes", async () => {
  const item: Item = {
    name: "milk",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "dairy",
  };

  await createItem(item);
  
  const newItem: Item = {
    name: "milk",
    expiry: "2023-03-20",
    notes: "expiring in 10 days",
    type: "other",
  };

  const res = await updateItem(newItem);

  const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk",
    },
  });

  expect(res).toEqual(dbItem);
});