import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Search from "./components/Search";

import "./assets/style.css";

import Card from "./components/Card";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [getname, setGetName] = useState("");

  function getpokemoninfo(result) {
    console.log(result);

    result.forEach((element) => {
      const res = fetch(`${element.url}`)
        .then((res) => res.json())
        .then((data) => setPokemon((prev) => [...prev, data]));
    });
  }

  async function getpokemon(getname) {
    setPokemon([]);

    const res = fetch(
      `https://pokeapi.co/api/v2/pokemon/${
        getname != "" ? getname.toLowerCase() : ""
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        getname != "" ? setPokemon([data]) : getpokemoninfo(data.results);
      });
  }
  useEffect(() => {
    getpokemon("");
  }, []);

  function handleSubmit(pokemonname) {
    // setGetName(pokemonname);
    console.log(pokemonname);
    getpokemon(pokemonname);
  }

  return (
    <>
      <div className="container">
        <Search handleSubmit={handleSubmit} />
      </div>
      <div className="poke-container">
        {pokemon?.map((item, index) => (
          <Card pokemon={item} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
