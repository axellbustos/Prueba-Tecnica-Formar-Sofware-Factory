import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPage = () => {
  const location = useLocation();
  const { globalPokemons } = useContext(PokemonContext);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
        const searchAbilities = Array.isArray(location.state) ? location.state : location.state.toLowerCase().trim().split(" ");

        const filtered = globalPokemons.filter(pokemon =>
          pokemon.name.includes(location.state.toLowerCase()) ||
            pokemon.abilities.some(ability =>
              searchAbilities.includes(ability.ability.name.toLowerCase()))  ||
                pokemon.types.some(type =>
                  type.type.name === location.state.toLowerCase())
        );
        console.log(location.state);
        console.log(searchAbilities);
        setFilteredPokemons(filtered);

  }, [location.state, globalPokemons]);

  return (
    <div className="container">
      <p className="p-search">
        Se encontraron <span>{filteredPokemons.length}</span> resultados:
      </p>
      <div className="card-list-pokemon container">
        {filteredPokemons.map(pokemon => (
          <CardPokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
};
