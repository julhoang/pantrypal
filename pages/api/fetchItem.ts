import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

export default async function handleFetch(req: NextApiRequest, res: NextApiResponse) {
  // extract the data from the request query parameters
  const name = req.query.name as string;
  const expiry = req.query.expiry as string;
  const type = req.query.type as string;

  try {
    const items = await prisma.item.findMany({
      orderBy: {
        expiry: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: name,
            },
          },
          {
            expiry: {
              contains: expiry,
            },
          },
          {
            type: {
              contains: type,
            },
          },
        ],
      },
    });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
}


export async function fetchItem(itemDetails: Item) {
  // extract the data from the request (req) body
  const { name, expiry, type } = itemDetails;

  //finding the items that include the stated infromation
  try {
    const item = await prisma.item.findMany({
      orderBy: {
        expiry: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: name,
            },
          },
          {
            expiry: {
              contains: expiry,
            },
          },
          {
            type: {
              contains: type,
            },
          },
        ],
      },
    });
    return item;
  } catch (e) {
    return null;
  }
}
