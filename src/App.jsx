import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Search from "./components/Search";

import "./assets/style.css";

import Card from "./components/Card";

function App() {
  const [pokemon, setPokemon] = useState([]);

  function getpokemoninfo(result) {
    result.forEach((element) => {
      const res = fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
        .then((res) => res.json())
        .then((data) => setPokemon((prev) => [...prev, data]));
    });
  }

  useEffect(() => {
    const res = fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) => getpokemoninfo(data.results));
  }, []);
  {
    pokemon;
  }
  return (
    <>
      <div className="container">
        <Search />
      </div>
      <div className="poke-container">
        {pokemon.map((item, index) => (
          <Card pokemon={item} key={index} />
        ))}
      </div>
    </>
  );
}

export default App;
