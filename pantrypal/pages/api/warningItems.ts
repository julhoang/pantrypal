import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

const today = new Date();
const next_two_days = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)
  .toLocaleDateString()
  .slice(0, 10);

export default async function handleWarning(req: NextApiRequest, res: NextApiResponse) {
  // get all items from the database
  const items = await getExpiringItems();

  if (items === null) {
    res.status(500).json({ error: "Something went wrong when getting items" });
  } else {
    // send the items back to the client
    res.status(200).json(items);
    return items;
  }
}

// get all items from the database
export async function getExpiringItems() {
  try {
    const items = await prisma.item.findMany({
      where: {
        expiry: {
          lte: next_two_days,
        },
      },
      orderBy: {
        expiry: "asc",
      },
      select: {
        name: true,
        expiry: true,
        notes: true,
        type: true,
      },
    });
    return items;
  } catch (e) {
    console.log(e);
    return null;
  }
}
