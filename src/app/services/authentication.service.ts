import { Injectable } from '@angular/core';

const TOKEN_STORAGE_KEY = "auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  clearSession(): void {
    localStorage.clear();
  }

  storeToken(token: string | null) {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}
