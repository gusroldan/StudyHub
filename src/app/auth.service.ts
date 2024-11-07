import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor(private http: HttpClient) {
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const token = localStorage.getItem('token');
    this.authenticated = !!token;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/login', { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.authenticated = true;
            this.checkLocalStorage(); // Verificación adicional después del login
          }
        })
      );
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('token');
    this.checkLocalStorage(); // Verificación adicional después del logout
  }

  isAuthenticated(): boolean {
    console.log('Authenticated:', this.authenticated); // Para verificar si el estado es correcto
    return this.authenticated;
  }
}
