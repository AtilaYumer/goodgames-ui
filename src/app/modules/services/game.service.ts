import { Injectable } from '@angular/core';
import { Game } from '../model/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games: Game[] = [
    { id: 1, name: "Contact 001", description: "Contact 001 des" },
    { id: 2, name: "Contact 002", description: "Contact 002 des" },
    { id: 3, name: "Contact 003", description: "Contact 003 des" },
    { id: 4, name: "Contact 004", description: "Contact 004 des" }
  ];

  constructor() { }

  public getGames(): Game[] {
    return this.games;
  }

  public createGame(game: Game): void {
    this.games.push(game);
  }
}
