import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

// export default async function handleFetch(req: NextApiRequest, res: NextApiResponse){
//     //calls the fetchItem function to find all the entiries with the specified data
//     try {
//     const item = fetchItem(req.body);
//     console.log(item);

//     // send the new item back to the client
//     res.status(200).json(item);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: "Something went wrong when finding the item" });
//   }
// }

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
