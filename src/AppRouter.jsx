import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { Home, PokemonDetail, SearchPage } from './pages';

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={< SearchBar/>}>
				<Route index element={<Home />} />
				<Route path='pokemon/:id' element={<PokemonDetail />} />
				<Route path='search' element={<SearchPage />} />
			</Route>

            <Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
