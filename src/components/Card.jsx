import React from "react";

import "../assets/style.css";
import img from "../assets/bg.jpg";

export default function Card({ pokemon }) {
  const color = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#ff0069",
    fighting: "#30336b",
    fire: "f0932b",
    flying: "81ecec",
    grass: "00b894",
    ground: "efb549",
    ghost: "a55eea",
    ice: "74b9ff",
    normal: "95afc0",
    poison: "6c5ce7",
    psychic: "a29bfe",
    rock: "2d3436",
    water: "0190ff",
  };

  const themecolor = color[pokemon.types[0].type.name];

  const stylecard = {
    background: `radial-gradient(circle at 50% 0%, ${themecolor} 36%, #fff 36%)`,
  };

  const styletype = {
    backgroundColor: `${themecolor}`,
  };

  return (
    <div id="card" style={stylecard}>
      {console.log(themecolor)}
      <p className="hp">
        <span>Hp</span>
        {pokemon.stats[0].base_stat}
      </p>
      <img src={pokemon.sprites.front_default} alt="" />
      <h2 className="poke-name">{pokemon.name}</h2>
      <div className="types">
        {pokemon.types.map((element) => {
          return (
            <span key={element.type.name} style={styletype}>
              {element.type.name}
            </span>
          );
        })}
      </div>
      <div className="stats">
        <div>
          <h3>{pokemon.stats[1].base_stat}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>{pokemon.stats[2].base_stat}</h3>
          <p>Defence</p>
        </div>
        <div>
          <h3>{pokemon.stats[5].base_stat}</h3>
          <p>Speed</p>
        </div>
      </div>
    </div>
  );
}
