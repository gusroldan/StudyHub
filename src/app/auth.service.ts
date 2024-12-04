import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  private readonly defaultEmail = 'admin';
  private readonly defaultPassword = 'admin';

  constructor() {
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const token = localStorage.getItem('token');
    this.authenticated = !!token;
  }

  login(email: string, password: string): Observable<any> {
    if (email === this.defaultEmail && password === this.defaultPassword) {
      const token = 'fake-jwt-token'; 
      localStorage.setItem('token', token);
      this.authenticated = true;
      this.checkLocalStorage();
      return of({ token });
    } else {
      this.authenticated = false;
      return of({ error: 'Credenciales incorrectas' });
    }
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('token');
    this.checkLocalStorage();
  }

  isAuthenticated(): boolean {
    console.log('Authenticated:', this.authenticated);
    return this.authenticated;
  }
}
