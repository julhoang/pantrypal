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
          ["fruit 🍎", "vegetable 🥕", "meat 🥩", "dairy 🧀", "other 🍴"].map((category) => {
            const filteredItems = items.filter((item) => item.type === category.split(" ")[0]);
            return (
              <InfoBox
                key={category}
                stats={filteredItems.length}
                description={`${category}`}
              />
            );
          })}
      </HStack>
      {/* Expiring */}
      <ExpiryWarning items={items} />
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
  const today = new Date();
  const twoDaysFromNow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

  const expiring = items
    .filter((item) => {
      const expiryDate = new Date(item.expiry);
      return expiryDate > today && expiryDate <= twoDaysFromNow;
    })
    .sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());

  const expired = items
    .filter((item) => new Date(item.expiry).getTime() - new Date().getTime() < 0)
    .sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime());

  if (expiring.length > 0 || expired.length > 0) {
    return (
      <div id="warning-zone">
        <Text
          style={{
            color: "red",
            fontWeight: "600",
            fontSize: "1.2rem",
            marginBottom: "5px",
          }}
        >
          ⚠️ WARNING:
        </Text>

        {expired.length > 0 && (
          <span
            style={{ fontWeight: "600" }}
            id="expired-warning"
          >
            {expired.length} items already expired:{" "}
            {expired.map((item) => (
              <Badge
                id = {"expired-" + item}
                colorScheme="red"
                marginLeft={"2"}
              >
                {item.name}{" "}
              </Badge>
            ))}
            <br />
            <br />
          </span>
        )}

        {expiring.length > 0 && (
          <span
            style={{ fontWeight: "600", marginTop: "3" }}
            id="expiring-warning"
          >
            {expiring.length} items expiring in the next two days:{" "}
            {expiring.map((item) => (
              <Badge
                colorScheme="orange"
                marginLeft={"2"}
              >
                {item.name}{" "}
              </Badge>
            ))}
          </span>
        )}
      </div>
    );
  } else {
    return (
      <Text
        fontWeight={"500"}
        id="no-warning-message"
      >
        No items expiring in the next two days! 🎉
      </Text>
    );
  }
}
