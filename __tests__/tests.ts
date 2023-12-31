import prisma from "../lib/prisma";
import { createItem } from "../pages/api/createItem";
import { expect, test, describe, beforeAll } from "@jest/globals";
import { Item, resType } from "../lib/types";
import { fetchItem } from "../pages/api/fetchItem";
import { deleteItem } from "../pages/api/deleteItem";

const today = new Date();
const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
  .toLocaleDateString()
  .slice(0, 10);
const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
  .toLocaleDateString()
  .slice(0, 10);
const next3days = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
  .toLocaleDateString()
  .slice(0, 10);

const pinapple: Item = {
  name: "pinapple-test",
  expiry: today.toLocaleDateString().slice(0, 10), //today
  notes: "this is a test",
  type: "fruit",
};

const beef: Item = {
  name: "beef-test",
  expiry: tomorrow,
  notes: "this is a test",
  type: "meat",
};

const pork: Item = {
  name: "pork-test",
  expiry: next3days,
  notes: "this is a test",
  type: "meat",
};

const cheese: Item = {
  name: "cheese-test",
  expiry: yesterday,
  notes: "this is a test",
  type: "dairy",
};

const tomato: Item = {
  name: "tomato-test",
  expiry: next3days,
  notes: "this is a test",
  type: "meat",
};

const olive: Item = {
  name: "olive-test",
  expiry: today.toLocaleDateString().slice(0, 10),
  notes: "this is a test",
  type: "other",
};

describe("Test All Functions", () => {
  // --- TEST CREATE ITEM ---
  describe("Test Create Functions", () => {
    // create an array of test items
    const items = [pinapple, beef, pork, cheese, tomato, olive];

    // loop through each item and test
    test.each(items)("add %s to the database", async (item) => {
      // create a new item in the database
      const res = await createItem(item);
      expect(res).not.toBeNull();

      const dbItem = await prisma.item.findUnique({
        where: {
          name: item.name,
        },
      });

      expect(res).toEqual(dbItem);
    });

    test("add duplicate item to the database", async () => {
      const res = await createItem(pinapple);
      expect(res).toBeNull();
    });
  });

  // --- TEST FETCH ITEM ---
  describe("Test Fetch Functions", () => {
    test("fetch by name from the database", async () => {
      const item: Item = {
        name: "beef-test",
        expiry: "****",
        notes: "****",
        type: "****",
      };

      const res = await fetchItem(item);
      expect(res).toContainEqual(beef);
    });

    test("fetch by expiry from the database", async () => {
      const item: Item = {
        name: "****",
        expiry: yesterday,
        notes: "****",
        type: "****",
      };

      const res = await fetchItem(item);
      expect(res).toContainEqual(cheese);
    });

    test("fetch by type from the database", async () => {
      const item: Item = {
        name: "****",
        expiry: "****",
        notes: "****",
        type: "other",
      };

      const res = await fetchItem(item);
      expect(res).toContainEqual(olive);
    });

    test("fetch multiple items from the database and sort by expiry", async () => {
      const item: Item = {
        name: "****",
        expiry: "****",
        notes: "****",
        type: "meat",
      };

      const res = await fetchItem(item);
      expect(res).toContainEqual(beef);
    });
  });

  // --- TEST DELETE ITEM ---
  describe("Test Delete Function", () => {
    const items = [pinapple, beef, pork, cheese, tomato, olive];
    test.each(items)("delete %s from the database", async (item) => {
      // delete each item from the database
      const res = await deleteItem(item.name);
      expect(res).not.toBeNull();
    });

    test("delete non-existent item from the database", async () => {
      const badItem: Item = {
        name: "non-existent-item",
        expiry: "****",
        notes: "****",
        type: "****",
      };
      const res = await deleteItem(badItem.name);
      expect(res).toEqual({ count: 0 });
    });
  });
});
