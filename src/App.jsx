import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Search from "./components/Search";

import "./assets/style.css";

import Card from "./components/Card";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentpgurl, setCurrentpgUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  // const [getname, setGetName] = useState("");

  const [nextpgurl, setNextpgUrl] = useState("");
  const [previoupgsurl, setPreviouspgUrl] = useState("");

  function getpokemoninfo(result) {
    // console.log(result);

    result.forEach((element) => {
      const res = fetch(`${element?.url}`)
        .then((res) => res.json())
        .then((data) => setPokemon((prev) => [...prev, data]));
    });
  }

  async function getpokemon(getname, pgurl) {
    setPokemon([]);

    const res = fetch(`${pgurl}${getname != "" ? getname.toLowerCase() : ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (getname == "") {
          setPreviouspgUrl(data?.previous);
          setNextpgUrl(data?.next);
        }
        getname != "" ? setPokemon([data]) : getpokemoninfo(data?.results);
      });
  }
  useEffect(() => {
    getpokemon("", currentpgurl);
  }, []);

  function handleSubmit(pokemonname) {
    // setGetName(pokemonname);
    console.log(pokemonname);
    getpokemon(pokemonname, currentpgurl);
  }

  // console.log(previoupgsurl, nextpgurl);

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

      <div className="page-btn">
        {previoupgsurl && (
          <button
            onClick={() => getpokemon("", previoupgsurl)}
            className="add-btn"
          >
            Previous
          </button>
        )}
        {nextpgurl && (
          <button onClick={() => getpokemon("", nextpgurl)} className="add-btn">
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default App;
