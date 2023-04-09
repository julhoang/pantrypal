import { recipeDisplayProps } from "@/lib/types";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Divider,
  Center,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

function modalContent(recipeList: any, index: number) {
  return (
    <div>
      <ModalContent>
        <ModalHeader>{recipeList[index]["recipe"]["label"]}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Image
              boxSize="150px"
              src={recipeList[index]["recipe"]["image"]}
              alt="Recipe Preview"
            />
          </Center>

          <Heading
            size="md"
            textTransform="uppercase"
            marginTop="20px"
          >
            Ingredients
          </Heading>
          {recipeList[index]["recipe"]["ingredientLines"].map((ingredient: string) => (
            <text>
              {ingredient}
              <br />
            </text>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button
            id={"recipeSourceButton-" + index.toString()}
            bgGradient="linear(to-r, #00ff87, #60efff)"
            mr={3}
            onClick={() => {
              console.log("clicked");
              window.open(recipeList[index]["recipe"]["url"], "_blank", "noreferrer");
            }}
            rightIcon={<FaArrowRight />}
          >
            Recipe Instructions
          </Button>
        </ModalFooter>
      </ModalContent>
    </div>
  );
}

const RecipeDisplay = (props: recipeDisplayProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipeNumber, setRecipeNumber] = useState(0);

  const { recipeList } = props;

  if (recipeList.length > 0) {
    return (
        <>
        <Box
            marginTop={"15px"}
            overflowY="auto"
            maxHeight="600px"
            maxWidth="500px"
        >
            <Text textAlign={"center"} as='b' size={"md"}>Displaying {recipeList.length} Recipes</Text>
            <Divider></Divider>
            </Box>
        <Box
          marginTop={"15px"}
          overflowY="auto"
          maxHeight="600px"
          maxWidth="500px"
        >
          {recipeList.map((recipe: any, index: number) => (
            <>
              <Card
                maxWidth={"400px"}
                key={recipe["recipe"]["label"]}
                maxW={"lg"}
                margin={"0px auto 10px auto"}
                padding={"5px"}
              >
                <CardBody>
                  <Heading size="md" textTransform="uppercase" >
                    {recipe["recipe"]["label"]}
                  </Heading>
                  <Divider />
                  <Stack
                    direction={"row"}
                    spacing="24px"
                    margin={"10px 0px 10px 0px"}
                  >
                    <Image
                      boxSize="150px"
                      src={recipe["recipe"]["image"]}
                      alt="Recipe Preview"
                    />
                    <Stack direction={"column"}>
                      <Text>{"Meal Type: " + recipe["recipe"]["mealType"]}</Text>
                      <Text>{"Est. Time: " + recipe["recipe"]["totalTime"]}</Text>
                      <Text>{"Portions: " + recipe["recipe"]["yield"]}</Text>
                      <Text>
                        {"Number of Ingredients: " + recipe["recipe"]["ingredientLines"].length}
                      </Text>
                    </Stack>
                  </Stack>
                  <Button
                    key={index}
                    id={"moreInfoButton-" + index.toString()}
                    onClick={() => {
                      console.log(recipe);
                      onOpen();
                      setRecipeNumber(index);
                    }}
                  >
                    More Info
                  </Button>
                </CardBody>
              </Card>

              <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={'inside'}
                closeOnOverlayClick={true}
                blockScrollOnMount={false}
              >
                <ModalOverlay
                  backdropFilter="auto"
                  bg="grey"
                />
                {modalContent(recipeList, recipeNumber)}
              </Modal>
            </>
          ))}
        </Box>
      </>
    );
  }

  return (
    <>
        <Box
            marginTop={"15px"}
            overflowY="auto"
            maxHeight="600px"
            maxWidth="500px"
        >
            <Text textAlign={"center"} as='b' size={"md"}>Displaying 0 Recipes</Text>
            <Divider></Divider>
        </Box>
        <Box
            marginTop={"15px"}
            overflowY="auto"
            maxHeight="600px"
            maxWidth="500px"
        >
        <Card maxW={"lg"} margin={"auto"} >
            <CardBody>
            <Heading size="xs" textTransform="uppercase" >
                No Recipes Found
            </Heading>
            <Text marginTop={4}>
                Please select some ingredients first then press the Find Recipe!
            </Text>
            </CardBody>
        </Card>
        </Box>
        </>
  );
};

export default RecipeDisplay;
