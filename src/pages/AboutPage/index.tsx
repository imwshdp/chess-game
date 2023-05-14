import * as React from 'react';

import css from './index.module.css';

const AboutPage = () => {
	return (
		<section className={css.aboutApp}>
			<h1>Веб-приложение "Шахматы"</h1>
			<p>Приложение написано на React с использованием языка TypeScript и стейт-менеджера MobX.</p>
			<p>Также приложение использует React Context, React Hooks.</p>
			<p className={css.githubLink}>
				Ссылка на репозиторий <a href='https://github.com/imwshdp/react-ts-chess-app'>GitHub</a>
			</p>
		</section>
	);
};

export default AboutPage;
