import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private validCredentials = { username: 'user', password: 'password' }; 

  constructor() {
    // Inicializa el estado de autenticación desde localStorage
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true; // Si hay un token, el usuario está autenticado
    } else {
      this.authenticated = false; // Si no hay token, no está autenticado
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.validCredentials.username && password === this.validCredentials.password) {
      this.authenticated = true; 
      localStorage.setItem('token', 'your_token_here'); // Guarda el token en localStorage
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
