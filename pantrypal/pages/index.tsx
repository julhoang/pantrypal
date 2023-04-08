import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import Social from "../components/Social";
import Header from "@/components/Header";
import { AbsoluteCenter, Box, Stack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box
      position="relative"
      height="100vh"
      width={"100%"}
      bg="gray.100"
    >
      <Header />
      <Navbar currentPage={"home"} />
      <AbsoluteCenter>
        <Box
          border="1px solid black"
          borderWidth={1}
          borderRadius={8}
          p={10}
        >
          <Introduction />

          <Social />
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}
