import React, { useContext, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from './CardPokemon'; 
import { Loader } from './Loader'; 

export const PokemonGalery = () => {
  const { allPokemons, setAllPokemons, setFilteredPokemons, loading, filteredPokemons } = useContext(PokemonContext);
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const handleCheckboxChange = (e) => {
    const pokemonName = e.target.value;

    if (e.target.checked) {
      setSelectedPokemons([...selectedPokemons, pokemonName]);
    } else {
      setSelectedPokemons(selectedPokemons.filter((name) => name !== pokemonName));
    }
  };

  const handleDeleteClick = () => {
    const updatedAllPokemons = allPokemons.filter((pokemon) => !selectedPokemons.includes(pokemon.name));
    const updatedFilteredPokemons = filteredPokemons.filter((pokemon) => !selectedPokemons.includes(pokemon.name));

    setAllPokemons(updatedAllPokemons);
    setFilteredPokemons(updatedFilteredPokemons);

    setSelectedPokemons([]);
	  console.log(allPokemons);
  };

  return (
    <>
      {loading ? (
        <Loader /> 
      ) : (
        <div >
            <div className='information-box'>
              
            {filteredPokemons.length > 0 && (
              <p>
                {selectedPokemons.length} seleccionado(s) de {filteredPokemons.length} mostrado(s)
              </p>
            )}
            {selectedPokemons.length > 0 && (
            <button onClick={handleDeleteClick} className="delete-button">Eliminar seleccionados</button>
          )}
          </div>
        <div className="card-list-pokemon container">
          
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon) => (
                <CardPokemon 
                  pokemon={pokemon}
                  key={pokemon.id}
                  isChecked={selectedPokemons.includes(pokemon.name)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            ) : (
              allPokemons.map((pokemon) => (
                <CardPokemon 
                  pokemon={pokemon}
                  key={pokemon.id}
                  isChecked={selectedPokemons.includes(pokemon.name)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
          
        </div>
        </div>
      )}
    </>
  );
};
