import prisma from "../lib/prisma";
import { expect, test, afterAll, describe } from "@jest/globals";
import { Item, resType } from "../lib/types";
import { fetchItem } from "../pages/api/fetchItem";
import { createItem } from "../pages/api/createItem";
import { queryString } from "../pages/api/queryString";

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
const pinapple: Item = {
  name: "pinapple",
  expiry: today.toLocaleDateString().slice(0, 10), //today
  notes: "this is a test",
  type: "meat",
};

const beef: Item = {
  name: "beef",
  expiry: tomorrow,
  notes: "this is a test",
  type: "meat",
};

const pork: Item = {
  name: "pork",
  expiry: next3days,
  notes: "this is a test",
  type: "meat",
};

 describe("Intigration tests", () => {
    test("fetch by type from the database then get API string", async () => {
        
    //creating the items
    await createItem(pork);
    await createItem(beef);
    await createItem(pinapple);

      // getting all the items that contain test in the name and putting them into an item array
      const item: Item = {
        name: "****",
        expiry: "****",
        notes: "****",
        type: "meat",
      };

      const res = await fetchItem(item);
      const itemName = new Array(10);

      if(res!=null){
      for (let i= 0; i < res.length; i++){
          const { name } = res[i];
          itemName[i] = name;
      };
      };

      //making a mealType string
      let mealType: string[] = ['Dinner'];

      //making a health string
      let health: string[] = ['vegetarian', 'dairy-free'];
    
      //call queryString to make a string to call the API with
      const APIString: string = queryString(itemName, health, mealType);

      expect(APIString).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=pinapple&q=beef&q=pork&health=vegetarian&health=dairy-free&mealType=Dinner");

    });

    test("delete an item then fetch by type from the database then get API string", async () => {
        
    //deleting an item from the db
    await prisma.item.deleteMany({
      where: {
        name: {
          contains: "pinapple",
        },
      },
    });

      // getting all the items that contain test in the name and putting them into an item array
      const item: Item = {
        name: "****",
        expiry: "****",
        notes: "****",
        type: "meat",
      };

      const res = await fetchItem(item);
      console.log(res);
      const itemName = new Array(10);

      if(res!=null){
      for (let i= 0; i < res.length; i++){
          const { name } = res[i];
          itemName[i] = name;
      };
      };
      console.log(itemName);

      //making a mealType string
      let mealType: string[] = ['Dinner'];

      //making a health string
      let health: string[] = ['vegetarian', 'dairy-free'];
    
      //call queryString to make a string to call the API with
      const APIString: string = queryString(itemName, health, mealType);

      expect(APIString).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=beef&q=pork&health=vegetarian&health=dairy-free&mealType=Dinner");

    });

    test("fetch by name from the database then get API string", async () => {
        
      // getting all the items that contain test in the name and putting them into an item array
      const item: Item = {
        name: "pork",
        expiry: "****",
        notes: "****",
        type: "****",
      };

      const res = await fetchItem(item);
      const itemName = new Array(10);

      if(res!=null){
      for (let i= 0; i < res.length; i++){
          const { name } = res[i];
          itemName[i] = name;
      };
      };

      //making a mealType string
      let mealType: string[] = ['Lunch'];

      //making a health string
      let health: string[] = ['vegetarian', 'dairy-free'];
    
      //call queryString to make a string to call the API with
      const APIString: string = queryString(itemName, health, mealType);

      expect(APIString).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&q=pork&health=vegetarian&health=dairy-free&mealType=Lunch");

    });
  });

//Deleting added items from the db to clean it up
afterAll(async () => {
    await prisma.item.deleteMany({
      where: {
        type: {
          contains: "meat",
        },
      },
    });

    await prisma.$disconnect();
  });