import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // extract the data from the request (req) body
  const { name, expiry, notes, type } = req.body;

  try {
    // create a new item in the database
    const item = await prisma.item.create({
      data: { name: name, expiry: expiry, notes: notes, type: type },
    });

    // send the new item back to the client
    res.status(200).json(item);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong when adding item" });
  }
}
