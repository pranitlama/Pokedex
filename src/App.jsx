import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Search from "./components/Search";

import "./assets/style.css";

import Card from "./components/Card";
import Button from "./components/Button";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentpgurl, setCurrentpgUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [getname, setGetName] = useState("");

  const [nextpgurl, setNextpgUrl] = useState("");
  const [previoupgsurl, setPreviouspgUrl] = useState("");
  const [error, setError] = useState(false);

  function getpokemoninfo(result) {
    // console.log(result);

    result.forEach((element) => {
      const res = fetch(`${element?.url}`)
        .then((res) => res.json())
        .then((data) => setPokemon((prev) => [...prev, data]));
    });
  }

  async function getpokemon(getname, pgurl) {
    setError(false);
    setPokemon([]);
    try {
      const res = fetch(`${pgurl}${getname != "" ? getname.toLowerCase() : ""}`)
        .then((res) => {
          if (res.status == 404) {
            setError(true);
            console.log("error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (getname == "") {
            setPreviouspgUrl(data?.previous);
            setNextpgUrl(data?.next);
          }
          getname != "" ? setPokemon([data]) : getpokemoninfo(data?.results);
        });
    } catch (error) {
      alert("error");
    }
  }
  useEffect(() => {
    getpokemon("", currentpgurl);
  }, []);

  function handleSubmit(pokemonname) {
    setGetName(pokemonname);

    // console.log(pokemonname);
    getpokemon(pokemonname, currentpgurl);
  }

  return (
    <>
      <div className="container">
        <Search handleSubmit={handleSubmit} />
      </div>
      {error ? (
        <div>
          <h1>NO POKEMON FOUND!</h1>
          <Button onClick={() => getpokemon("", currentpgurl)} name={"Back"} />
        </div>
      ) : (
        <div className="poke-container">
          {pokemon?.map((item, index) => (
            <Card pokemon={item} key={index} />
          ))}
        </div>
      )}

      {getname == "" ? (
        <div className="page-btn">
          {previoupgsurl && (
            <Button
              onClick={() => getpokemon("", previoupgsurl)}
              name={"Previous"}
            />
          )}
          {nextpgurl && (
            <Button onClick={() => getpokemon("", nextpgurl)} name={"Next"} />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
