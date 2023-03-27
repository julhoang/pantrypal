import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useRef } from "react";

function RecipeRecommendations:React.FC = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="2xl">
        Hello!
      </Heading>
      <Text mt={4}>
        basic text to test Recipe Recommendations!
      </Text>
    </Box>
  );
}

export default RecipeRecommendations;