import prisma from "../lib/prisma";
import { it } from "node:test";
import { createItem } from "../pages/api/createItem";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";

// test add item
test("addItem", () => {
  it("add apple to the database", async () => {
    // create a new item in the database
    const item: Item = {
      name: "pinapple-test",
      expiry: "2021-12-31",
      notes: "this is a test",
      type: "fruit",
    };

    const res = await createItem(item);

    const dbItem = await prisma.item.findUnique({
      where: {
        name: "pinapple-test",
      },
    });

    expect(res).toEqual(dbItem);
  });
});
