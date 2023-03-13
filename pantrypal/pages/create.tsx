import React, { useRef } from "react";

const createEntry: React.FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const expiry = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

export default createEntry;
