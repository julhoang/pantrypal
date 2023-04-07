import { Box, Flex, Heading, Select, Spacer, Stack, StackDivider, Text, VStack} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import React, { useRef, useState} from "react";
import { Tag, TagLabel, TagLeftIcon, HStack, Button } from '@chakra-ui/react'
import { queryString, getRecipe } from "./api/getRecipe";
import RecipeDisplay from "./RecipeDisplay";
        

var itemsSelected:string [];
var selectedMealType = [""];

function handleOptionToggle (mealType: string){
        selectedMealType = [mealType];
        console.log(mealType);
      }

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

  if(itemsSelected == null){
    itemsSelected = [itemName];
  }
  else{
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
}
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
  const [recipeResults, setRecipeResults] = useState({});
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
    
      const options = [
        { id: 1, label: 'Breakfast' },
        { id: 2, label: 'Lunch' },
        { id: 3, label: 'Dinner' },
        { id: 4, label: 'Brunch' },
        { id: 5, label: 'Snack' },
        { id: 6, label: 'Teatime' },
      ];
      
  return (
        <div>
          <Flex flexDirection={"row"} >
            <Stack dir="row" flex='1' >
              <Box overflowY="auto" margin={"auto"} maxWidth={"600px"} >

                <Stack spacing={4} >
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
                <label htmlFor="multi-select-dropdown">Select meal type:</label>
                <select>
                  {options.map(option => (
                    <option
                    key={option.id}
                    value={option.id}
                    onClick={() => handleOptionToggle(option.label)}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                </Stack>
                <Button id={"findRecipeButton"} onClick={async ()=>{
                  const query = queryString(itemsSelected,[],[]);
                  const result = await getRecipe(query); 
                  setRecipeResults(result);
                }}>
                  Find Recipe
                </Button>
                </Box>
              
            </Stack>
            <Box flex='1' >

              <RecipeDisplay recipeList={recipeResults}/>
            </Box>
          </Flex>
      </div>
  );
}


