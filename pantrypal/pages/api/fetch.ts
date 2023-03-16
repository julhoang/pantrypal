import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient(); 
import { Item } from "../../lib/types";

// main driver to handle request
export default async function handleFetch(req: NextApiRequest, res: NextApiResponse) {
  try {
    // create a new item in the database
    const item = await fetchItem(req.body);

    // send the new item back to the client
    res.status(200).json(item);
  } catch (e) {
    // if there was an error, send it back to the client
    console.log(e);
    res.status(500).json({ error: "Something went wrong when adding item" });
  }
}

// fetch from database
export async function fetchItem(item: Item) {
  return await prisma.item.findMany({
    where: {
      name: item.name,
    },
  });
}
