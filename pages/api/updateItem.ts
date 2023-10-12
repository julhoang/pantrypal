import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const updatedItem = await updateItem(req.body);
  res.json(updatedItem);
}

export async function updateItem(newItem: Item) {
  const updatedItem = await prisma.item.update({
    where: {
      name: newItem.name,
    },
    data: newItem,
  });
  return updatedItem;
}
