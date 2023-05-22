import React from "react";
import { Link } from "react-router-dom";
import { CapitalizeEffect } from "../helper/helper";

export const CardPokemon = ({ pokemon, isChecked, onCheckboxChange }) => {
  let typeClass = "";

  if (pokemon.types.length > 0) {
    typeClass = pokemon.types[0].type.name;
  }

  return (
    <div className={`card-pokemon ${typeClass}`}>
      <div className="card-img">
        <Link to={`/pokemon/${pokemon.id}`}>
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={`Pokemon ${pokemon.name}`}
          />
        </Link>
      </div>
      <div className="card-info">
        <span className="pokemon-id">
          N° {pokemon.id}{" "}
          <label class="custom-checkbox">
            <input
              type="checkbox"
              value={pokemon.name}
              checked={isChecked}
              onChange={onCheckboxChange}
            />
            <span class="icon"><i class="fa-solid fa-trash-can"></i></span>
          </label>
        </span>
        <h3>{CapitalizeEffect(pokemon.name)}</h3>
        <div className="card-types">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
