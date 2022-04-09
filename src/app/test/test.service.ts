import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getMessage(): Observable<string> {
    return this.http.get(`${environment.urlApi}/application/test`, {responseType: 'text'});
  }
}
