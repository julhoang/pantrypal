import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Item } from "../../lib/types";

 export default async function updateItem(itemOrg: Item, itemNew: Item ){
    var {name} = itemOrg;// getting the name of the item to update
    const updatedItem = await prisma.item.update({
        where: {
            name: name,
        },
        data: 
            itemNew,
    });
    return updatedItem;

 }