import { Box, Divider, Heading, Text } from "@chakra-ui/react";

const Team = () => {
  return (
    <Box
      p={4}
      width="90%"
      bg="white"
      borderRadius={8}
      marginTop={10}
    >
      <Heading
        as="h2"
        size="lg"
        mb={2}
      >
        Meet Our Team 👋🏻
      </Heading>
      <Text mb={4}>
        We are a team of four passionate developers working on PantryPal. Get to know us a little
        better:
      </Text>

      <Divider />

      <Box
        mb={8}
        marginTop={5}
      >
        <Heading
          as="h3"
          size="md"
          mb={2}
        >
          Aman Palod
        </Heading>
        <Text mb={2}>V00968304</Text>
        <Text mb={4}>
          Aman is a robust front end developer. His
          interests include creating high-quality, user-friendly applications.
        </Text>
      </Box>
      <Box mb={8}>
        <Heading
          as="h3"
          size="md"
          mb={2}
        >
          Chloe Zackarias
        </Heading>
        <Text mb={2}>V00961884</Text>
        <Text mb={4}>
          Chloe is a talented designer who focuses on creating beautiful, intuitive interfaces that
          enhance the user experience.
        </Text>
      </Box>
      <Box mb={8}>
        <Heading
          as="h3"
          size="md"
          mb={2}
        >
          Jenny Luu
        </Heading>
        <Text mb={2}>V00961828</Text>
        <Text mb={4}>
          Jenny is an experienced backend developer who specializes in building robust, scalable
          systems that can handle high traffic loads.
        </Text>
      </Box>
      <Box mb={8}>
        <Heading
          as="h3"
          size="md"
          mb={2}
        >
          Julia Hoang
        </Heading>
        <Text mb={2}>V00974641</Text>
        <Text mb={4}>
          Julia is a skilled frontend developer who is passionate about creating responsive,
          accessible websites that look great on any device.
        </Text>
      </Box>

      <Divider />

      <Text
        mb={4}
        fontStyle={"italic"}
        marginTop={5}
      >
        Special thanks to our mentors Neil Ernst and Niloofar for guiding us through out the project
        👏🏻
      </Text>
    </Box>
  );
};

export default Team;
