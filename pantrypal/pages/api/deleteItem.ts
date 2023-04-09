import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// main driver to handle request
export default async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    // delete a new item in the database
    const item = await deleteItem(req.body);

    // send the new item back to the client
    res.status(200).json(item);
  } catch (e) {
    // if there was an error, send it back to the client
    console.log(e);
    res.status(500).json({ error: "Something went wrong when adding item" });
  }
}

// delete from database
export async function deleteItem(itemName: string) {
  try {
    const deleted = await prisma.item.deleteMany({
      where: {
        name: itemName,
      },
    });

    return deleted;
  } catch (e) {
    console.log(e);
    return null;
  }
}
