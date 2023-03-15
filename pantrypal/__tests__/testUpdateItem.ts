import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import {fetchItem}  from "../pages/api/updateItem";



test("update item name", async () => {
    //change item name milk to milk-test
    const item: Item = {
    name: "milk",
    expiry: "****",
    notes: "****",
    type: "****",
  };

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk-test",
    },
  });

  expect(res).toEqual(dbItem);

  expect(res).toEqual(itemExpected);
});