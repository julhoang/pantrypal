import prisma from "../lib/prisma";
import { expect, test, afterAll, describe } from "@jest/globals";
import { Item } from "../lib/types";
import { fetchItem } from "../pages/api/fetchItem";
import { createItem } from "../pages/api/createItem";
import { queryString } from "../pages/api/getRecipe";

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

//Adding new items to the db
const Apple: Item = {
  name: "Apple",
  expiry: today.toLocaleDateString().slice(0, 10), //today
  notes: "this is a test",
  type: "vegetable",
};

const chicken: Item = {
  name: "chicken",
  expiry: tomorrow,
  notes: "this is a test",
  type: "vegetable",
};

const grape: Item = {
  name: "grape",
  expiry: next3days,
  notes: "this is a test",
  type: "vegetable",
};

describe("integration tests", () => {
  test("fetch by type from the database then get API string", async () => {
    //creating the items
    await createItem(Apple);
    await createItem(grape);
    await createItem(chicken);

    // getting all the items that contain test in the name and putting them into an item array
    const item: Item = {
      name: "****",
      expiry: "****",
      notes: "****",
      type: "vegetable",
    };

    const res = await fetchItem(item);
    const itemName = new Array(10);

    if (res != null) {
      for (let i = 0; i < res.length; i++) {
        const { name } = res[i];
        itemName[i] = name;
      }
    }

    //making a mealType string
    let mealType: string[] = ["Dinner"];

    //making a health string
    let health: string[] = ["vegetarian", "dairy-free"];

    //call queryString to make a string to call the API with
    const APIString: string = queryString(itemName, health, mealType);

    expect(APIString).toEqual(
      "https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=Apple&q=chicken&q=grape&health=vegetarian&health=dairy-free&mealType=Dinner"
    );
  });

  test("delete an item then fetch by type from the database then get API string", async () => {
    //deleting an item from the db
    await prisma.item.deleteMany({
      where: {
        name: {
          contains: "Apple",
        },
      },
    });

    // getting all the items that contain test in the name and putting them into an item array
    const item: Item = {
      name: "****",
      expiry: "****",
      notes: "****",
      type: "vegetable",
    };

    const res = await fetchItem(item);
    const itemName = new Array(10);

    if (res != null) {
      for (let i = 0; i < res.length; i++) {
        const { name } = res[i];
        itemName[i] = name;
      }
    }

    //making a mealType string
    let mealType: string[] = ["Dinner"];

    //making a health string
    let health: string[] = ["vegetarian", "dairy-free"];

    //call queryString to make a string to call the API with
    const APIString: string = queryString(itemName, health, mealType);

    expect(APIString).toEqual(
      "https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=chicken&q=grape&health=vegetarian&health=dairy-free&mealType=Dinner"
    );
  });

  test("fetch by name from the database then get API string", async () => {
    // getting all the items that contain test in the name and putting them into an item array
    const item: Item = {
      name: "chicken",
      expiry: "****",
      notes: "****",
      type: "****",
    };

    const res = await fetchItem(item);
    const itemName = new Array(10);

    if (res != null) {
      for (let i = 0; i < res.length; i++) {
        const { name } = res[i];
        itemName[i] = name;
      }
    }

    //making a mealType string
    let mealType: string[] = ["Lunch"];

    //making a health string
    let health: string[] = ["vegetarian", "dairy-free"];

    //call queryString to make a string to call the API with
    const APIString: string = queryString(itemName, health, mealType);

    expect(APIString).toEqual(
      "https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=chicken&health=vegetarian&health=dairy-free&mealType=Lunch"
    );
  });
});

//Deleting added items from the db to clean it up
afterAll(async () => {
  await prisma.item.deleteMany({
    where: {
      type: {
        contains: "vegetable",
      },
    },
  });

  await prisma.$disconnect();
});
