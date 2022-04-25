import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGameTitleDto } from '../model/CreateGameTitleDto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IGamePageable } from '../model/IGamePageable';
import { GameTitleDto } from '../model/GameTitleDto';

@Injectable({
  providedIn: 'root'
})
export class GameTitleService {

  constructor(private http: HttpClient) { }

  public getGames(): Observable<IGamePageable> {
    return this.http.get<IGamePageable>(`${environment.urlApi}/game-titles`);
  }

  create$(gameTitle: CreateGameTitleDto): Observable<void> {
    console.log(gameTitle);

    const formData = new FormData();
    formData.append('title', gameTitle.title);
    formData.append('description', gameTitle.description);
    if (gameTitle.image) {
      formData.append('image', gameTitle.image);
    }

    return this.http.post<void>(`${environment.urlApi}/game-titles/`, formData, {
      withCredentials: true
    });
  }

  getGameTitleById$(gameTitleId: number): Observable<GameTitleDto> {
    return this.http.get<GameTitleDto>(`${environment.urlApi}/game-titles/${gameTitleId}`);
  }

  like$(gameTitleId: number): Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/game-titles/${gameTitleId}/like`, {});
  }

  dislike$(gameTitleId: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlApi}/game-titles/${gameTitleId}/like`, {});
  }
}
