import React from 'react';
import { Figure } from 'resources/models/figures/Figure';

interface LostFiguresProps {
	title: string;
	figures: Figure[];
}

const BoxContainer: React.FC<LostFiguresProps> = ({ title, figures }) => {
	return (
		<div className='lost'>
			<h3>{title}</h3>
			{figures.map(figure => (
				<div key={figure.id}>
					{figure.logo && <img width={20} height={20} src={figure.logo} />} {figure.name}
				</div>
			))}
		</div>
	);
};

export default BoxContainer;
