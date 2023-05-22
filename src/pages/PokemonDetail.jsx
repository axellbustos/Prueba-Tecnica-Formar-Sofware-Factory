import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components";
import { PokemonContext } from "../context/PokemonContext";
import { CapitalizeEffect } from "../helper/helper";

export const PokemonDetail = () => {
  const { getPokemonByID } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  return (
    <main className="container main-pokemon">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`header-main-pokemon ${pokemon.types[0].type.name}`}>
            <div className="header-main-pokemon-img">
              <h1>{`Nº ${pokemon.id}   ${CapitalizeEffect(pokemon.name)}`}</h1>
              <div className="container-img-pokemon">
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={`Pokemon ${pokemon?.name}`}
                />
              </div>
            </div>
          </div>
          <div className="container-info">
              <div className="container-info-pokemon">
                <h1>Tipo</h1>
                <div className="card-types info-pokemon-type">
                  {pokemon.types.map((type) => (
                    <span key={type.type.name} className={`${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className="info-pokemon">
                  <div className="group-info">
                    <p>Altura</p>
                    <span>{pokemon.height}</span>
                  </div>
                  <div className="group-info">
                    <p>Peso</p>
                    <span>{pokemon.weight}KG</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-info2">
              <h1>Habilidades</h1>
              <div className="card-types info-pokemon-type">
                {pokemon.abilities.map((ability) => (
                  <span key={ability.ability.name} className={"abilities-color"}>
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="container-stats">
              <h1>Estadísticas</h1>
              <div className="stats">
                <div className="stat-group">
                  <span>Hp</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[0].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Attack</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[1].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Defense</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[2].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Special Attack</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[3].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Special Defense</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[4].base_stat}
                  </span>
                </div>
                <div className="stat-group">
                  <span>Speed</span>
                  <div className={`progress-bar ${pokemon.types[0].type.name}`}></div>
                  <span className="counter-stat">
                    {pokemon.stats[5].base_stat}
                  </span>
                </div>
              </div>
            </div>
        </>
      )}
    </main>
  );
};
