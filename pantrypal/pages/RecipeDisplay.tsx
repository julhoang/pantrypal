import { recipeDisplayProps } from "@/lib/types";
import { Box, Card, CardBody, Heading, Text, Image } from "@chakra-ui/react";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { getRecipe, queryString } from "./api/getRecipe";

const RecipeDisplay = (props: recipeDisplayProps) =>{
    const {recipeList} = props;
    console.log("length");
    console.log(recipeList.length);

    if(recipeList.length == 20){

        console.log("Recipelist in display");
        console.log(recipeList);

        const first = recipeList[0];
        console.log(first["recipe"]["label"]);

        return (
            <Box>
                {recipeList.map((recipe: any) => 
                <Card key={recipe["recipe"]["label"]} maxW={'lg'} margin={'auto'} padding={"10px"}>
                    <CardBody>
                        <Heading size='xs' textTransform='uppercase'>
                            {recipe["recipe"]["label"]}
                        </Heading>
                        <Image
                            boxSize='150px'
                            src={recipe["recipe"]["image"]}
                            alt='Recipe Preview'
                            />
                        <Text> 
                            {recipe["recipe"]["ingredientLines"]}
                        </Text>
                    </CardBody>
                </Card>
                )}
            </Box>
        )
    }

    return (
        <Box>
            <Card maxW={'lg'} margin={'auto'}>
                <CardBody>
                    <Heading size='xs' textTransform='uppercase'>
                        No Recipes Found
                    </Heading>
                    <Text> 
                        Please press the button to find recipes!
                    </Text>
                </CardBody>
            </Card>
        </Box>
    )
}

export default RecipeDisplay;
