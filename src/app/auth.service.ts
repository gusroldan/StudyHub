import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private validCredentials = { username: 'user', password: 'password' }; 

  constructor() {}

  
  login(username: string, password: string): boolean {
    if (username === this.validCredentials.username && password === this.validCredentials.password) {
      this.authenticated = true; 
      return true;
    }
    return false; 
  }


  logout() {
    this.authenticated = false; 
  }

  
  isAuthenticated(): boolean {
    return this.authenticated; 
  }
}

