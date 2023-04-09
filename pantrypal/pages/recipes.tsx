import React, { useState } from "react";
import {
  Box,
  Flex,
  Select,
  Spacer,
  Stack,
  Tag,
  HStack,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import { queryString, getRecipe } from "./api/getRecipe";
import RecipeDisplay from "../components/RecipeDisplay";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

let itemsSelected: string[];
let selectedMealType: string[];
let selectedHealthOption: string[];

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
}

function handleItemSelected(itemName: string) {
  //check if the item is in the list
  let inTheList = false;
  let i = 0;

  if (itemsSelected == null) {
    itemsSelected = [itemName];
  } else {
    for (i = 0; i < itemsSelected.length; i++) {
      if (itemsSelected[i] == itemName) {
        //the item is in the list
        //REMOVE THE ITEM
        itemsSelected.splice(i, 1);
        inTheList = true;
      }
    }
    if (!inTheList) {
      // it is not in the list
      itemsSelected[i] = itemName;
    }
  }
}

function getItemNames(itemArray: string | any[]) {
  let nameArray = new Array(100);
  for (let i = 0; i < itemArray.length; i++) {
    const { name } = itemArray[i];
    nameArray[i] = name;
  }
  return nameArray;
}

function Feature({ title, itemNames, ...rest }) {
  const [active, setActive] = React.useState([]);

  const changeActive = (buttonIndex) => {
    if (active.includes(buttonIndex)) {
      setActive(active.filter((index) => index !== buttonIndex)); // Deselect the button if it's already selected
    } else {
      setActive([...active, buttonIndex]); // Select the button
    }
  };

  return (
    <Box {...rest}>
      <Tag
        size="md"
        variant="subtle"
        backgroundColor="white"
        color="black"
        marginBottom={2}
      >
        {title}
      </Tag>
      <HStack spacing={4}>
        {itemNames.map((name, index) => (
          <Button
            key={index}
            id={name}
            size="sm"
            onClick={() => {
              handleItemSelected(name);
              changeActive(index);
            }}
            size="sm"
            bg={active.includes(index) ? "#00ff87" : "gray.200"}
            color="black"
            _hover={{ bg: "#00ff87" }}
          >
            {name}
          </Button>
        ))}
      </HStack>
    </Box>
  );
}

export default function PantryTable(props: {
  fruitItems: string | any[] | null;
  dairyItems: string | any[] | null;
  vegetableItems: string | any[] | null;
  meatItems: string | any[] | null;
  otherItems: string | any[] | null;
}) {
  const [recipeResults, setRecipeResults] = useState({});
  //defining all the variables that need to be use to populate the button names
  let fruitItemNames = [];
  let dairyItemNames = [];
  let vegetableItemNames = [];
  let meatItemNames = [];
  let otherItemNames = [];

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

  const [value, setValue] = React.useState("");

  const handleChange = (mealType) => {
    setValue(mealType.target.value);
    selectedMealType = [mealType.target.value];
    if (mealType.target.value == "") selectedMealType = [];
  };

  const [health, setHealth] = React.useState("");

  const handleSelected = (healthOption) => {
    setHealth(healthOption.target.value);
    selectedHealthOption = [healthOption.target.value];
    if (healthOption.target.value == "") selectedHealthOption = [];
  };

  return (
    <div>
      <Header />
      <Navbar currentPage="recipes" />
      <Flex
        flexDirection={"row"}
        marginTop={"30"}
      >
        <Stack
          dir="row"
          flex="1"
        >
          <Box
            overflowY="auto"
            margin={"auto"}
            maxWidth={"600px"}
          >
            <Heading as={"h4"}>Recipes</Heading>
            <Text
              fontSize="lg"
              fontWeight={600}
              marginBottom={4}
            >
              Click on one or more ingredients below to find recipes
            </Text>
            <Stack spacing={4}>
              <Feature
                title="FRUIT 🍎: "
                itemNames={fruitItemNames}
              />
              <Feature
                title="VEGETABLE 🥕: "
                itemNames={vegetableItemNames}
              />
              <Feature
                title="MEAT 🥩:"
                itemNames={meatItemNames}
              />
              <Feature
                title="DAIRY 🧀: "
                itemNames={dairyItemNames}
              />
              <Feature
                title="OTHER 🍴: "
                itemNames={otherItemNames}
              />
              <HStack>
                <label htmlFor="meal-type-dropdown">Meal type:</label>
                <Select
                  width="200px"
                  variant="filled"
                  value={value}
                  onChange={handleChange}
                  placeholder="Any"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Teatime">Teatime</option>
                  <option value="">Any</option>
                </Select>
              </HStack>
              <HStack>
                <label htmlFor="health-dropdown">Health:</label>
                <Select
                  width="200px"
                  variant="filled"
                  value={health}
                  onChange={handleSelected}
                  placeholder="Nothing"
                >
                  <option value="dairy-free">Dairy Free</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="alcohol-free">Alcohol Free</option>
                  <option value="peanut-free">Peanut Free</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                </Select>
              </HStack>
            </Stack>
            <Spacer />
            <Button
              marginTop="30px"
              id={"findRecipeButton"}
              onClick={async () => {
                const query = queryString(itemsSelected, selectedHealthOption, selectedMealType);
                const result = await getRecipe(query);
                setRecipeResults(result);
              }}
              bgGradient="linear(to-r, #00ff87, #60efff)"
              _hover={{bgGradient:"linear(to-r, #02e87c, #59dceb)"}}
              
              >
              Find Recipes 🔍
            </Button>
            <Button
              marginTop="30px"
              marginLeft="10px"
              id={"randomRecipeButton"}
              onClick={async () => {
                const query = queryString([], [], []) + "ingr=0%2B";
                const result = await getRecipe(query);
                setRecipeResults(result);
              }}
              bgGradient="linear(to-r, #00ff87, #60efff)"
              _hover={{bgGradient:"linear(to-r, #02e87c, #59dceb)"}}
            >
              Random Recipe 🎲
            </Button>
          </Box>
        </Stack>
        <Box flex="1">
          <RecipeDisplay recipeList={recipeResults} />
        </Box>
      </Flex>
    </div>
  );
}
