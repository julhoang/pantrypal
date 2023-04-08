import React from "react";
import Navbar from "../components/Navbar";
import Header from "@/components/Header";
import { AbsoluteCenter, Box, Center } from "@chakra-ui/react";
import Team from "@/components/Team";

export default function TeamPage() {
  return (
    <Box
      position="relative"
      height="100vh"
      width={"100%"}
      bg="gray.100"
    >
      <Header />
      <Navbar currentPage={"team"} />

      <Box>
        <Center>
          <Team />
        </Center>
      </Box>
    </Box>
  );
}
