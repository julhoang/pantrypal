import React from "react";
import { Link, Heading, Text , Stack, HStack} from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { FaGithub} from 'react-icons/fa';


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
  
  export default Social;