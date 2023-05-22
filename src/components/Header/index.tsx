import React from 'react';
import { Link } from 'react-router-dom';
import AppIcon from 'styles/icons/AppIcon';
import css from './index.module.css';

const Header: React.FC = () => {
	return (
		<div className={css.header}>
			<AppIcon />
			<nav className={css.headerNav}>
				<Link to={'/about'}>О приложении</Link>
				<Link to={'/'}>Шахматы</Link>
			</nav>
		</div>
	);
};

export default Header;
