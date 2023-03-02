import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const items = await prisma.item.findMany({
    select: {
      name: true,
      expiry: true,
    },
  });

  console.log(JSON.stringify(items));

  return {
    props: {
      items,
    },
  };
};

type Item = {
  id: number;
  name: string;
  expiry: string;
  notes: string;
  type: string;
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
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};

export default Table;
