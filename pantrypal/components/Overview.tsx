import React from "react";
import { Box, Flex, Heading, Text, Center, HStack, Badge } from "@chakra-ui/react";
import { Item } from "@/lib/types";

export default function Overview({ items }: { items: Item[] }) {
  return (
    <Box>
      <Heading
        as={"h5"}
        marginBottom={"5"}
      >
        Overview
      </Heading>

      <HStack marginBottom={"5"}>
        <InfoBox
          stats={items ? items.length : 0}
          description={"items in total"}
        />

        {items &&
          items.length > 0 &&
          ["fruit", "vegetable", "meat", "dairy", "other"].map((category) => {
            const filteredItems = items.filter((item) => item.type === category);
            return (
              <InfoBox
                stats={filteredItems.length}
                description={`${category}`}
              />
            );
          })}
      </HStack>
      {/* Expiring */}
      <ExpiryWarning items={items.filter((item) => new Date(item.expiry) < new Date())} />
    </Box>
  );
}

function InfoBox({ stats, description }: { stats: number; description: string }) {
  return (
    <Box
      bg={"white"}
      borderWidth={1}
      borderRadius={8}
      p={3}
      borderColor={"#60efff"}
    >
      <Text fontSize={"md"}>
        <span style={{ fontWeight: "600" }}>{stats}</span>
        <span> {description}</span>
      </Text>
    </Box>
  );
}

function ExpiryWarning({ items }: { items: Item[] }) {
  items = items.sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());

  if (items.length > 0) {
    return (
      <>
        <span
          style={{
            color: "red",
            fontWeight: "600",
            fontSize: "1.2rem",
            marginBottom: "5px",
          }}
        >
          ⚠️ WARNING:{" "}
        </span>
        <span style={{ fontWeight: "600" }}>
          {items.length} items expiring in the next two days:{" "}
          {items.map((item) => (
            <Badge
              colorScheme="red"
              marginLeft={"2"}
            >
              {item.name}{" "}
            </Badge>
          ))}
        </span>
      </>
    );
  } else {
    return <Text fontWeight={"500"}>No items expiring in the next two days! 🎉</Text>;
  }
}
