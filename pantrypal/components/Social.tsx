import React from "react";
import { Stack, Button } from "@chakra-ui/react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Social = () => {
  return (
    <Stack
      spacing={4}
      direction="row"
      align="center"
      justify="space-between"
    >
      <Link href="/pantry">
        <Button
          bgGradient="linear(to-r, #00ff87, #60efff)"
          _hover={{ bgGradient: "linear(to-r, #00ff87, #60efff)" }}
          rightIcon={<FaArrowRight />}
          size="lg"
        >
          Get Started
        </Button>
      </Link>

      <Link href="https://github.com/uvic-seng321/project-requirement-rascals-15">
        <Button
          colorScheme="gray"
          variant="solid"
          size="md"
          bg="gray.700"
          color="white"
          leftIcon={<FaGithub />}
          _hover={{ bg: "gray.600" }}
        >
          Github
        </Button>
      </Link>
    </Stack>
  );
};

export default Social;
