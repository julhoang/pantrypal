import prisma from "../lib/prisma";
import { expect, test } from "@jest/globals";
import { Item } from "../lib/types";
import { fetchItem } from "../pages/api/fetch";
import { createItem } from "../pages/api/createItem";
import { queryString } from "../pages/api/queryString";
import { APICall } from "../pages/api/APICall";

//Adding new items to the db
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


describe("Itigration tests", () => {
 
  describe("Test Fetch Item", () => {
    test("fetch by name from the database", async () => {
      // getting all the items that contain test in the name and putting them into an item array
      const item: Item = {
        name: "-test",
        expiry: "****",
        notes: "****",
        type: "****",
      };

      //making a mealType string
      let mealType: string[] = ['Dinner'];

      //making a health string
      let health: string[] = ['Vegitarian', 'dairy-free'];
    
      //call queryString to make a string to call the API with
      const APIString: string = queryString(item, health, mealType);

      expect(APIString).toEqual("EXPECTED STRING WITH THIS INPUT");

    };
  });

//Deleting added items from the db to clean it up
  afterAll(async () => {
    await prisma.item.deleteMany({
      where: {
        name: {
          contains: "-test",
        },
      },
    });

    await prisma.$disconnect();
  });