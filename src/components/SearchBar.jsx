import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

export const SearchBar = () => {
	const { onInputChange, valueSearch, onResetForm } =
		useContext(PokemonContext);

	const navigate = useNavigate();

	const onSearchSubmit = e => {
		e.preventDefault();
		navigate('/search', {
			state: valueSearch,
		});

		onResetForm();
	};

	return (
		<>
			<header className='container'>
				<Link to='/' className='logo'>
					<img
						src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.BYzBkTz30r2T1hU60iIF9QHaHa%26pid%3DApi&f=1&ipt=71388ce3b7928c8a24f86d37ff89db878b6c82f421c5d8ee07e9661da4a8acdf&ipo=images'
						alt='Logo Pokedex'
					/>
				</Link>

				<form onSubmit={onSearchSubmit}>
					<div className='form-group'>
						<input
							type='search'
							name='valueSearch'
							id=''
							value={valueSearch}
							onChange={onInputChange}
							placeholder='Busca por nombre, habilidad o tipo de pokemon'
						/>
					</div>

					<button className='btn-search'><svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='3'
							stroke='currentColor'
							className='icon-search'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg></button>
				</form>
			</header>

			<Outlet />
		</>
	);
};
