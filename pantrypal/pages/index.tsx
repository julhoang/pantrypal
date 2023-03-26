import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

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
      items,
    },
  };
};

type Props = {
  items: Item[];
};

const Table: React.FC<Props> = (props) => {
  return (
    <div>
      <Head>
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
      <main>
        <p>{JSON.stringify(props)}</p>
      </main>
    </div>
  );
};

export default Table;