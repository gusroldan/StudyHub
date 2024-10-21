import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private validCredentials = { username: 'user', password: 'password' }; 

  constructor() {
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.validCredentials.username && password === this.validCredentials.password) {
      this.authenticated = true; 
      localStorage.setItem('token', 'your_token_here');
      return true;
    }
    return false; 
  }

  logout() {
    this.authenticated = false; 
    localStorage.removeItem('token'); // Elimina el token de localStorage
  }

  isAuthenticated(): boolean {
    return this.authenticated; 
  }
}
