import React from "react";
import { Box, Flex, Spacer, Heading, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = ({ currentPage }: { currentPage: string }) => {
  return (
    <Box
      bgGradient="linear(to-r, #00ff87, #60efff)"
      px={4}
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
        >
          <Heading
            as="h1"
            size="lg"
          >
            PantryPal
          </Heading>
        </Link>
        <Spacer />

        <Stack direction="row">
          <Link
            href="/pantry"
            style={{ textDecoration: "none" }}
          >
            <Button
              fontWeight={currentPage === "pantry" ? "bold" : "500"}
              bg={currentPage === "pantry" ? "gray.100" : "transparent"}
              _hover={{ bg: "gray.100" }}
              size="md"
            >
              Pantry 🥕
            </Button>
          </Link>

          <Link
            href="/recipes"
            style={{ textDecoration: "none" }}
          >
            <Button
              fontWeight={currentPage === "recipes" ? "bold" : "500"}
              bg={currentPage === "recipes" ? "gray.100" : "transparent"}
              _hover={{ bg: "gray.100" }}
              size="md"
            >
              Recipes 🍲
            </Button>
          </Link>

          <Link
            href="/team"
            style={{ textDecoration: "none" }}
          >
            <Button
              size="md"
              fontWeight={currentPage === "team" ? "bold" : "500"}
              bg={currentPage === "team" ? "gray.100" : "transparent"}
              _hover={{ bg: "gray.100" }}
            >
              Team 🤝
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
