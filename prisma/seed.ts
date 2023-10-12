import prisma from "../lib/prisma";
import { Item } from "../lib/types";

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
  name: "pinapple",
  expiry: today.toLocaleDateString().slice(0, 10), //today
  notes: "",
  type: "fruit",
};

const beef: Item = {
  name: "beef",
  expiry: tomorrow,
  notes: "steak",
  type: "meat",
};

const chicken: Item = {
  name: "chicken",
  expiry: next3days,
  notes: "nuggets",
  type: "meat",
};

const cheese: Item = {
  name: "cheedar cheese",
  expiry: yesterday,
  notes: "",
  type: "dairy",
};

const tomato: Item = {
  name: "tomato",
  expiry: next3days,
  notes: "soup?",
  type: "meat",
};

const olive: Item = {
  name: "olive",
  expiry: today.toLocaleDateString().slice(0, 10),
  notes: "",
  type: "other",
};

const items: Item[] = [pinapple, beef, chicken, cheese, tomato, olive];

async function createItem(item: Item) {
    try {
      const newItem = await prisma.item.create({
        data: item,
      });
  
      return newItem;
    } catch (e) {
      return null;
    }
  }

async function populateDB() {
  for (const item of items) {
    await createItem(item);
  }
}

populateDB().catch((e) => {
  console.error(e);
  process.exit(1);
});
