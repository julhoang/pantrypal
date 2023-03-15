import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import updateItem  from "../pages/api/updateItem";



test("update item name", async () => {
    //change item name milk to milk-test
  const newName = "milk-test";

  const res = await updateItem("milk", newName);

   const dbItem = await prisma.item.findUnique({
    where: {
      name: "milk-test",
    },
  });

  expect(res).toEqual(dbItem);
});