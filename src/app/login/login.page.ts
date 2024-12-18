import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = ''; 
  password: string = ''; 
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {
    // Si ya está autenticado, redirige al área principal
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs']); 
    }
  }

  async login() {
    try {
      const response = await this.authService.login(this.email, this.password);
  
      if (response && response.token) {
        // Redirige a 'tab1' pasando el valor de 'admin'
        this.router.navigate(['/tabs'], {
          queryParams: { admin: response.admin }
        });
      } else if (response.error) {
        this.errorMessage = response.error;
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Inténtalo nuevamente.';
    }
  }  
}
