import * as React from 'react';
import { Link } from 'react-router-dom';
import css from './index.module.css';
import AppIcon from 'styles/icons/AppIcon';

const Header: React.FC = () => {
	return (
		<div className={css.header}>
			<AppIcon />
			<nav className={css.headerNav}>
				<Link to={'/about'}>О приложении</Link>
				<Link to={'/chess'}>Шахматы</Link>
			</nav>
		</div>
	);
};

export default Header;
