import React from 'react';
import StoreContext from 'context';
import { makeAutoObservable } from 'mobx';

import Player from 'resources/models/Player';

export default class chessStore {
	private _gameTime: number | null;

	private _isGameStarted: boolean;
	private _isGameEnded: boolean;
	private _isTimeEnded: boolean;

	private _currentPlayer: Player | null;

	constructor() {
		this._gameTime = 600;

		this._isGameStarted = false;
		this._isGameEnded = false;
		this._isTimeEnded = false;

		this._currentPlayer = null;
		makeAutoObservable(this);
	}

	// ACTIONS
	setGameTime(time: number | null) {
		this._gameTime = time;
	}

	setGameEnded() {
		this._isGameEnded = true;
		this._isGameStarted = false;
	}

	setTimeEnded() {
		this._isTimeEnded = true;
		this._isGameStarted = false;
	}

	restartGame() {
		this._isGameEnded = false;
		this._isTimeEnded = false;
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

	get timeEndStatus(): boolean {
		return this._isTimeEnded;
	}

	get gameTime(): number | null {
		return this._gameTime;
	}

	get currentPlayer(): Player | null {
		return this._currentPlayer;
	}
}

export const useStore = () => React.useContext(StoreContext);
