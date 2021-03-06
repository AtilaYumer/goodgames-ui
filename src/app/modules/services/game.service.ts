import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGameTitleDto } from '../model/CreateGameTitleDto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IGamePageable } from '../model/IGamePageable';
import { GameTitleDto } from '../model/GameTitleDto';
import { CreateCommentDto } from '../model/CreateCommentDto';

@Injectable({
  providedIn: 'root'
})
export class GameTitleService {

  constructor(private http: HttpClient) { }

  getGames$(): Observable<IGamePageable> {
    return this.http.get<IGamePageable>(`${environment.urlApi}/game-titles`);
  }

  getMyGames$(): Observable<IGamePageable> {
    return this.http.get<IGamePageable>(`${environment.urlApi}/game-titles/my-game-titles`, {
      withCredentials: true
    });
  }

  create$(gameTitle: CreateGameTitleDto): Observable<void> {
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

  edit$(gameTitleId: number, gameTitle: CreateGameTitleDto): Observable<void> {
    const formData = new FormData();
    formData.append('title', gameTitle.title);
    formData.append('description', gameTitle.description);
    if (gameTitle.image) {
      formData.append('image', gameTitle.image);
    }
    return this.http.put<void>(`${environment.urlApi}/game-titles/${gameTitleId}`, formData, {
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

  comment$(gameTitleId: number, createCommentDto: CreateCommentDto) : Observable<void> {
    return this.http.post<void>(`${environment.urlApi}/game-titles/${gameTitleId}/comments`, createCommentDto);
  }

  deleteComment$(gameTitleId:number, commentId: number) {
    return this.http.delete<void>(`${environment.urlApi}/game-titles/${gameTitleId}/comments/${commentId}`);
  }

  deleteGameTitle$(gameTitleId: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlApi}/game-titles/${gameTitleId}`)
  }
}
