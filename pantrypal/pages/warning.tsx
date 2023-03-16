import React from "react";
import { GetStaticProps } from "next";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";
import { getExpiringItems } from "../pages/api/warningItems";

const today = new Date();
const next_two_days = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString();

export const getStaticProps: GetStaticProps = async () => {
  const items = await getExpiringItems();

  return {
    props: {
      items,
    },
  };
};

export default function Warning({ items }: { items: Item[] }) {
  return (
    <div>
      <h1>Warning {items.length}</h1>

      <br />
      <h2>Today is {today.toDateString()}</h2>

      <br />
      <h2>Items expiring in the next two days:</h2>
      {items.map((item) => (
        <div key={item.name}>
          <p>
            {item.expiry} - {item.name}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}
