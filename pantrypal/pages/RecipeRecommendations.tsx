import { Box, Heading, Spacer, Stack, StackDivider, Text, VStack} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import { expect, test, afterAll, describe } from "@jest/globals";
import { Item, resType } from "../lib/types";
import { queryString } from "../pages/api/getRecipe";
import React, { useRef, useState} from "react";
import { FaAppleAlt} from 'react-icons/fa';
import {TbMilk} from 'react-icons/tb';
import { Tag, TagLabel, TagLeftIcon, HStack, Button } from '@chakra-ui/react'

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
    },
  });
  const vegetableItems = await prisma.item.findMany({
    where: {
          type: {
            contains: "vegetable",
          },
        },
    select: {
      name: true,
    },
  });
  const meatItems = await prisma.item.findMany({
    where: {
          type: {
            contains: "meat",
          },
        },
    select: {
      name: true,
    },
  });
  const otherItems = await prisma.item.findMany({
    where: {
          type: {
            contains: "other",
          },
        },
    select: {
      name: true,
    },
  });
  return {
    props: {
      fruitItems,
      dairyItems,
      vegetableItems,
      meatItems,
      otherItems,
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

  function getItemNames(itemArray: string | any[]){
    var nameArray = new Array(100);
    for (let i = 0; i < itemArray.length; i++) {
      const { name } = itemArray[i];
      nameArray[i] = name;
    }
    return nameArray;
  }

function Feature({title, itemNames, ...rest}){
    const [active, setActive] = React.useState([]);
  
    const changeActive  = (buttonIndex) => {
      if (active.includes(buttonIndex)) {
        setActive(active.filter((index) => index !== buttonIndex)); // Deselect the button if it's already selected
      } else {
        setActive([...active, buttonIndex]); // Select the button
      }
    }
  return(
    <Box {...rest}>
      <Tag size='md' variant='subtle' backgroundColor ='white' color= "black">
                {title}
            </Tag>
            <HStack spacing={4}>
            {itemNames.map((name, index) => (
              <Button key = {index} id = {name} onClick= {() => {handleItemSelected(name); changeActive(index)}} style={{
                backgroundColor: active.includes(index) ? 'green' : 'lightgreen',
                color: active.includes(index) ? 'white' : 'grey',
              }} >           
                {name}
              </Button>
            ))}
          </HStack>
    </Box>
  )
  }



export default function PantryTable (props: { fruitItems: string | any[] | null; dairyItems: string | any[] | null; vegetableItems: string | any[] | null; meatItems: string | any[] | null; otherItems: string | any[] | null;}) {
  //defining all the variables that need to be use to populate the button names
  var fruitItemNames = [];
  var dairyItemNames = [];
  var vegetableItemNames = [];
  var meatItemNames = []; 
  var otherItemNames = [];

  //get all the fruit item names from props.fruitItems
    if (props.fruitItems != null) {
      fruitItemNames = getItemNames(props.fruitItems);
    }
  //get all the dairy item names from props.dairyItems
    if (props.dairyItems != null) {
      dairyItemNames = getItemNames(props.dairyItems);
    }
  //get all the vegtable item names from props.vegtableItem
    if (props.vegetableItems != null) {
      vegetableItemNames = getItemNames(props.vegetableItems);
    }
     //get all the meat item names from props.meatItems
     if (props.meatItems != null) {
      meatItemNames = getItemNames(props.meatItems);
    }
     //get the other item names from props.otherItems
     if (props.otherItems != null) {
      otherItemNames = getItemNames(props.otherItems);
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
          <Stack spacing={4} align='stretch' >
        <Feature 
          title = 'FRUIT:'
          itemNames = {fruitItemNames} 
          />
          <Feature 
          title = 'DAIRY:'
          itemNames = {dairyItemNames} 
          />
          <Feature 
          title = 'VEGETABLE:'
          itemNames = {vegetableItemNames} 
          />
          <Feature 
          title = 'MEAT:'
          itemNames = {meatItemNames} 
          />
          <Feature 
          title = 'OTHER:'
          itemNames = {otherItemNames} 
          />
      
      </Stack>
      </div>
  );
}


