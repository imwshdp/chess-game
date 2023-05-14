import React from 'react';
import StoreContext from 'context';
import { makeAutoObservable } from 'mobx';

import Player from 'resources/models/Player';

export default class chessStore {
	private _gameTime: number | null;
	private _currentPlayer: Player | null;

	private _isGameStarted: boolean;
	private _isGameEnded: boolean;

	constructor() {
		this._gameTime = 600;
		this._currentPlayer = null;

		this._isGameStarted = false;
		this._isGameEnded = false;

		makeAutoObservable(this);
	}

	// ACTIONS
	setGameTime(time: number | null) {
		this._gameTime = time;
	}

	setGameEnded() {
		this._isGameEnded = true;
	}

	restartGame() {
		this._isGameStarted = false;
		this._isGameEnded = false;
	}

	startGame() {
		this._isGameStarted = true;
	}

	setCurrentPlayer(player: Player) {
		this._currentPlayer = player;
	}

	// GETTERS
	get gameStartStatus(): boolean {
		return this._isGameStarted;
	}

	get gameEndStatus(): boolean {
		return this._isGameEnded;
	}

	get gameTime(): number | null {
		return this._gameTime;
	}

	get currentPlayer(): Player | null {
		return this._currentPlayer;
	}
}

export const useStore = () => React.useContext(StoreContext);
