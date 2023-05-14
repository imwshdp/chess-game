import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

import Colors from 'resources/models/Colors';
import css from './index.module.css';

const Modal: React.FC = observer(() => {
	const store = useStore();
	const currentPlayer = store.currentPlayer,
		isGameEnded = store.gameEndStatus;

	// modal visibility state
	const [visible, setVisible] = useState(false);

	// winner's color
	const colorOfWinner = currentPlayer?.color === Colors.WHITE ? 'чёрным' : 'белым';

	useEffect(() => {
		if (isGameEnded) {
			setVisible(true);
			setTimeout(() => setVisible(false), 3000);
		}
	}, [isGameEnded]);

	return (
		<div className={visible === true ? css.ModalActive : css.Modal}>
			<div className={css.ModalContent}>
				Победа за <b>{`${colorOfWinner}`}</b> игроком!
			</div>
		</div>
	);
});

export default Modal;
