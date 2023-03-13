import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

// main driver to handle request
export default async function handleCreate(req: NextApiRequest, res: NextApiResponse) {
  try {
    // create a new item in the database
    const item = createItem(req.body);

    // send the new item back to the client
    res.status(200).json(item);
  } catch (e) {
    // if there was an error, send it back to the client
    console.log(e);
    res.status(500).json({ error: "Something went wrong when adding item" });
  }
}

// add to database
export async function createItem(item: Item) {
  return await prisma.item.create({
    data: {
      name: item.name,
      expiry: item.expiry,
      notes: item.notes,
      type: item.type,
    },
  });
}
