// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
// // import { deleteItem } from "./api/delete";
// import React, { useRef } from "react";

import { deleteItem } from "./api/delete";
import React, { useState } from "react";

const DeleteItem = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/fetchItem/item?name=${name}", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Fetch</button>
      </form>
    </div>
  );
};

export default DeleteItem;
