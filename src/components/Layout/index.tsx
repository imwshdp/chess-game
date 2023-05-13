import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';

const Layout: React.FC = () => {
	return (
		<>
			<Header />
			<div className='layout'>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
