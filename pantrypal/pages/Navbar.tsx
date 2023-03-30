import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { Box, Flex, Spacer, Link, Heading, Text , Stack, HStack} from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { FaBeer, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import Team from "./team";

const Navbar = () => {
    return (
      <Box bg="red.400" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Heading as="h1" size="lg">
              PantryPal
            </Heading>
          </Link>
          <Spacer />
          <Link href="#" mr={4}>
            Pantry
          </Link>
          <Link href="/Recipes" mr={4}>
            Recipes
          </Link>
          <Link href="/team" mr={4}>
            Team
          </Link>
  
        </Flex>
      </Box>
    );
  };

export default Navbar;