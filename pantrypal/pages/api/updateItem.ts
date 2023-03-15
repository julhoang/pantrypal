import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

 export default async function updateItem(itemName: string, newName: string ){

    const updatedItem = await prisma.item.update({
        where: {
            name: itemName,
        },
        data: {
            name: newName,
        },
    });
    return updatedItem;

 }