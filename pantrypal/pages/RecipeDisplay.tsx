import { recipeDisplayProps } from "@/lib/types";
import { Box, Card, CardBody, Heading, Text, Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Stack, Divider } from "@chakra-ui/react";
import { useState } from "react";

function modalContent (recipeList:any, index: number){
    return(
        <div>
        <ModalContent>
            <ModalHeader>{recipeList[index]["recipe"]["label"]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {recipeList[index]["recipe"]["ingredientLines"]}
            </ModalBody>

            <ModalFooter>
                {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button> */}
            </ModalFooter>
        </ModalContent>
        </div>
    )
}

const RecipeDisplay = (props: recipeDisplayProps) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ recipeNumber, setRecipeNumber ] = useState(0);

    const {recipeList} = props;
    console.log("length");
    console.log(recipeList.length);

    if(recipeList.length == 20){
        return (
            <>
                <Box overflowY="auto" maxHeight="500px">
                    {recipeList.map((recipe: any, index: number) =>
                    <>
                        <Card maxWidth={"600px"} key={recipe["recipe"]["label"]} maxW={'lg'} margin={"0px auto 10px auto"} padding={"5px"}>
                            <CardBody>
                                <Heading size='md' textTransform='uppercase'>
                                    {recipe["recipe"]["label"]}
                                </Heading>
                                <Divider/>
                                <Stack direction={'row'} spacing='24px' margin={"10px 0px 10px 0px"}>
                                    <Image
                                        boxSize='150px'
                                        src={recipe["recipe"]["image"]}
                                        alt='Recipe Preview'
                                        />
                                    <Stack direction={'column'}>
                                        <Text> 
                                            {"Meal Type: " + recipe["recipe"]["mealType"]}
                                        </Text>
                                        <Text> 
                                            {"Est. Time: " + recipe["recipe"]["totalTime"]}
                                        </Text>
                                        <Text> 
                                            {"Portions: " + recipe["recipe"]["yield"]}
                                        </Text>
                                        <Text>
                                            {"Number of Ingredients: " + recipe["recipe"]["ingredientLines"].length}
                                        </Text>
                                    </Stack>
                                </Stack>
                                <Button key={index} onClick={()=>{
                                        console.log(recipe);
                                        onOpen();
                                        setRecipeNumber(index);
                                        }
                                    }>
                                    More Info
                                </Button>
                            </CardBody>
                        </Card>  
                        <Modal isOpen={isOpen} onClose={onClose}>
                            
                            <ModalOverlay />
                            {modalContent(recipeList, recipeNumber)}
                        </Modal>
                    </>
                    )}
                </Box>
            </>
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
