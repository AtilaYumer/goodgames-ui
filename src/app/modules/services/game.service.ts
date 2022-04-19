import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGameTitleDto } from '../model/CreateGameTitleDto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IGamePageable } from '../model/IGamePageable';

@Injectable({
  providedIn: 'root'
})
export class GameTitleService {

  games: CreateGameTitleDto[] = [
    // { id: 1, name: "Contact 001", description: "Contact 001 des" },
    // { id: 2, name: "Contact 002", description: "Contact 002 des" },
    // { id: 3, name: "Contact 003", description: "Contact 003 des" },
    // { id: 4, name: "Contact 004", description: "Contact 004 des" }
  ];

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
}
