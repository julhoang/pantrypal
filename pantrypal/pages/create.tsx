import React, { useRef } from "react";
import Router from "next/router";
import { GetStaticProps } from "next";
import Head from "next/head";
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

const createEntry: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const expiry = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current?.value,
        expiry: expiry.current?.value,
        notes: notes.current?.value,
        type: type.current?.value,
      }),
    });
    const data = await res.json();
    console.log(data);

    // Router.push("/");
    // window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={name}
        />
        <br></br>
        <label htmlFor="expiry">Expiry</label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          ref={expiry}
        />
        <br></br>
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          id="notes"
          name="notes"
          ref={notes}
        />
        <br></br>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          ref={type}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// async function createEntry(name: String, expiry: String, notes: String, type: String) {
//   return name;
// }
export default createEntry;
