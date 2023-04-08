import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Introduction = () => {
  return (
    <Box marginBottom={10}>
      <Heading
        as="h2"
        size="lg"
        mb={2}
      >
        Welcome to PantryPal!
      </Heading>
      <Text mb={4}>
        PantryPal is a simple web application that allows you to keep track of the items in your
        pantry or kitchen. You can add new items, set expiration dates, and get reminders when items
        are about to expire. With PantryPal, you'll never have to worry about wasting food again.
      </Text>
      <Text mb={4}>
        Additionally, you can also get recipe recommendations based on the items in your pantry. You
        simply have to select the items you'd like to eat tonight.
      </Text>

      <Text>
        To get started, navigate to your Pantry and click the "Add Item" button to add a new item to
        your pantry.
      </Text>
    </Box>
  );
};

export default Introduction;
