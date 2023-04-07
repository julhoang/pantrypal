import { Box, Heading, Text, VStack} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import { expect, test, afterAll, describe } from "@jest/globals";
import { Item, resType } from "../lib/types";
import { queryString } from "../pages/api/getRecipe";
import React, { useRef, useState} from "react";
import { FaAppleAlt} from 'react-icons/fa';
import { ItemButtons } from './ItemButtons';

import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  HStack,
  Button,
} from '@chakra-ui/react'

var itemsSelected = [""];

export async function getStaticProps() {
  const fruitItems = await prisma.item.findMany({
    where: {
          type: {
            contains: "fruit",
          },
        },
    select: {
      name: true,
      expiry: true,
      notes: true,
      type: true,
    },
  });

  const dairyItems = await prisma.item.findMany({
    where: {
          type: {
            contains: "dairy",
          },
        },
    select: {
      name: true,
      expiry: true,
      notes: true,
      type: true,
    },
  });
  //console.log(JSON.stringify(dairyItems));

  return {
    props: {
      fruitItems,
      dairyItems,
    },
  };
};

function handleItemSelected (itemName: string){
  //check if the item is in the list 
  var inTheList = false;
  var i =0;
  for (i = 0; i < itemsSelected.length; i++) {
    if(itemsSelected[i] == itemName){//the item is in the list
      //REMOVE THE ITEM
      itemsSelected.splice(i,1);
      inTheList = true;
    }
  }
  if(!inTheList){// it is not in the list
    itemsSelected[i] = itemName;
  }
  alert(itemsSelected);
  }

export default function PantryTable (props: { fruitItems: string | any[] | null; dairyItems: string | any[] | null; }) {

  //get all the fruit item names from props.fruitItems
  const fruitItemNames = new Array(100);
    if (props.fruitItems != null) {
      for (let i = 0; i < props.fruitItems.length; i++) {
        const { name } = props.fruitItems[i];
        fruitItemNames[i] = name;
      }
    }

    //get all the dairy item names from props.dairyItems
    const dairyItemNames = new Array(100);
    if (props.dairyItems != null) {
      for (let i = 0; i < props.dairyItems.length; i++) {
        const { name } = props.dairyItems[i];
        dairyItemNames[i] = name;
      }
    }

    const [active, setActive] = React.useState([]);

    const changeActive  = (buttonIndex) => {
      if (active.includes(buttonIndex)) {
        setActive(active.filter((index) => index !== buttonIndex)); // Deselect the button if it's already selected
      } else {
        setActive([...active, buttonIndex]); // Select the button
      }
    }
  return (
        <div>
        <Tag size='md' variant='subtle' backgroundColor ='white' color= "black">
            <TagLeftIcon as={FaAppleAlt} />
            <TagLabel>FRUITS:</TagLabel>
        </Tag>
        <HStack spacing={4}>
        {fruitItemNames.map((name, index) => (
          <Button key = {index} id = {name} onClick= {() => {handleItemSelected(name); changeActive(index)}} style={{
            backgroundColor: active.includes(index) ? 'blue' : 'lightblue',
            color: active.includes(index) ? 'white' : 'grey',
          }} >           
            {name}
          </Button>
        ))}
      </HStack>
      </div>
  );
}
