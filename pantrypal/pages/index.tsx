import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { Box, Flex, Spacer, Link, Heading, Text , Stack, HStack} from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { FaBeer, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import Team from "./team";
import Navbar from "./Navbar";

export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany({
    select: {
      name: true,
      expiry: true,
      notes: true,
      type: true,
    },
  });

console.log(JSON.stringify(items));

  return {
    props: {
      // items,
    },
  };
};

type Props = {
  items: Item[];
};


const maindiv = () => {
  return(
    <p>hello there</p>
  );
}
const Introduction = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={2}>
        Welcome to PantryPal
      </Heading>
      <Text mb={4}>
        PantryPal is a simple web application that allows you to keep track of the items in your pantry or kitchen. You can add new items, set expiration dates, and get reminders when items are about to expire. With PantryPal, you'll never have to worry about wasting food again.
      </Text>
      <Text mb = {4}> 
        Additionally, you can also get recipe recommendations based on the items in your pantry. You simply have to select the items you'd like to eat tonight.

      </Text>
      
      <Text>
        To get started, navigate to your Pantry and click the "Add Item" button to add a new item to your pantry.
      </Text>
    </Box>
  );
};

const Social = () => {
  return(
    <Stack spacing={4} direction='row' align='center'>
    <Button colorScheme='teal' size='lg'>
      Get Started
    </Button>
    <Link href="https://github.com/uvic-seng321/project-requirement-rascals-15" isExternal>
    <Button colorScheme='gray' variant='solid' size='md' bg='gray.700' color='white' leftIcon={<FaGithub/>} >
      Github
    </Button>
    </Link>
</Stack>
  );
}


const Table: React.FC<Props> = (props) => {
  return (
    <div>
      <Head>
      <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.3/dist/bootstrap-table.min.css"/>
        <title>PantryPal</title>
        <meta
          name="description"
          content="PantryPal"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      
      <Navbar></Navbar>
      
      <main>
        {/* <p>{JSON.stringify(props)}</p> */}
        <div className="intro">
        
          <Introduction></Introduction>
          <div className="buttons">
          <Social></Social>
          </div>
        </div>
       
       
       
            
       
        <script src="https://unpkg.com/bootstrap-table@1.21.3/dist/bootstrap-table.min.js"></script>
      </main>
    </div>
  );
};

export default Table;