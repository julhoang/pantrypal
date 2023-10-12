import React from "react";
import Head from "next/head";

export default function Header() {
  return (
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
  );
}
