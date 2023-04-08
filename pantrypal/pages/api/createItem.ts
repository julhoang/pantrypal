import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

// main driver to handle request
export default async function handleCreate(req: NextApiRequest, res: NextApiResponse) {
  const item = createItem(req.body);

  // if item is null, something went wrong
  if (item === null) {
    res.status(500).json({ error: "Something went wrong when adding item" });
    return null;
  }

  // send the new item back to the client
  res.status(200).json(item);
  return item;
}

// add to database
export async function createItem(item: Item) {
  try {
    const newItem = await prisma.item.create({
      data: item,
    });

    return newItem;
  } catch (e) {
    // Prisma will throw an error if the item already exists
    return null;
  }
}
