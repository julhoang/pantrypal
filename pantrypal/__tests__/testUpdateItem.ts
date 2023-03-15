import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import updateItem  from "../pages/api/updateItem";



test("update item name", async () => {
    //change item name milk to milk-test
    const item: Item = {
    name: "milk",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "fruit",
  };

   const newItem: Item = {
    name: "milk-test",
    expiry: "2023-03-17",
    notes: "expiring in 3 days",
    type: "fruit",
  };

  const res = await updateItem(item, newItem);

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk-test",
    },
  });

  expect(res).toEqual(dbItem);
});