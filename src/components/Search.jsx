import React from "react";

export default function Search() {
  return (
    <>
      <h1>POKEDEX</h1>
      <form className="searchform">
        <input type="text" placeholder="Search a Pokemon" />
        <button className="add-btn">Search</button>
      </form>
    </>
  );
}
