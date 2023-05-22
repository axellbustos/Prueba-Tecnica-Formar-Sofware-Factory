import { useEffect, useState } from 'react';
import { useForm } from '../hook/useForm';
import { PokemonContext } from './PokemonContext';

export const PokemonProvider = ({ children }) => {
	const [allPokemons, setAllPokemons] = useState([]);
	const [globalPokemons, setGlobalPokemons] = useState([]);
	const [offset, setOffset] = useState(0);

	const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

	const [loading, setLoading] = useState(true);

	const getAllPokemons = async (limit = 15) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(false);
		
		console.log(offset);
	};
	
	const getGlobalPokemons = async () => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=100000`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setGlobalPokemons(results);
		setLoading(false);
	};
	const handleScroll = () => {
		// Verificar si se ha alcanzado el final de la página
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setOffset(offset + 15);//REVISAR
			  console.log(offset);
		}
	  };

	const getPokemonByID = async id => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	};

	useEffect(() => {
		getAllPokemons();
	}, [offset]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	
	useEffect(() => {
		getGlobalPokemons();
	}, []);

	const [filteredPokemons, setfilteredPokemons] = useState([]);

	return (
		<PokemonContext.Provider
			value={{
				valueSearch,
				onInputChange,
				onResetForm,
				allPokemons,
				setAllPokemons,
				globalPokemons,
				getPokemonByID,
				handleScroll,
				loading,
				setLoading,
				filteredPokemons,
			}}
		>
			{children}
		</PokemonContext.Provider>
	);
};
