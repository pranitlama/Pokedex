import React, { useState } from "react";

export default function Search({ handleSubmit }) {
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function submit(e) {
    e.preventDefault();

    handleSubmit(input);
  }

  return (
    <>
      <h1>POKEDEX</h1>
      <form className="searchform" onSubmit={submit}>
        <input
          type="text"
          placeholder="Search a Pokemon"
          onChange={(e) => handleChange(e)}
          value={input}
        />
        <button className="add-btn" type="submit">
          Search
        </button>
      </form>
    </>
  );
}
