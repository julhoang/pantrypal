import { Box, Heading, Text } from "@chakra-ui/react";
import { RecipeDisplay } from "./recipeDisplay";

function RecipeRecommendations() {
  return (
    <>
      <Box p={4}>
        <Heading as="h1" size="2xl">
          Hello!
        </Heading>
        <Text mt={4}>
          basic text to test Recipe Recommendations!
        </Text>
      </Box>
      <RecipeDisplay/>
    </>
  );
}

export default RecipeRecommendations;