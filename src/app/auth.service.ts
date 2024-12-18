import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SqliteService } from '../app/services/sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor(private database: SqliteService) {
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    const token = localStorage.getItem('tokenauth');
    this.authenticated = !!token;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.database.validateUser(email, password);
  
    if (user) {
      const token = 'fake-jwt-token'; 
      localStorage.setItem('tokenauth', token);
      localStorage.setItem('admin', user.admin.toString()); // Almacena el número como string en localStorage
      const idUsuario = user.id;  // Obtener el idUsuario del usuario logueado
      localStorage.setItem('idUsuario', idUsuario.toString());  // Guardar idUsuario en localStorage como string
      this.authenticated = true;
      this.checkLocalStorage();
      return { token, admin: user.admin }; // Devuelve el token y admin como número
    } else {
      this.authenticated = false;
      return { error: 'Credenciales incorrectas' };
    }
  }
  


  logout() {
    this.authenticated = false;
    localStorage.removeItem('tokenauth');
    this.checkLocalStorage();
  }

  isAuthenticated(): boolean {
    console.log('Authenticated:', this.authenticated);
    return this.authenticated;
  }
}
