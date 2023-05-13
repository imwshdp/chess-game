import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import AboutPage from 'pages/AboutPage';
import ChessPage from 'pages/ChessPage';
import './styles/index.css';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='/chess' element={<ChessPage />} />
				<Route path='/about' element={<AboutPage />} />
			</Route>
		</Routes>
	);
};

export default App;
