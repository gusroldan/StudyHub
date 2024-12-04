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
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs']); 
    }
  }

  login(event: Event) {
    event.preventDefault();
    
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.router.navigate(['/tabs']);
        } else {
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'; 
        }
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al intentar iniciar sesión. Intenta de nuevo.';
        console.error('Error de autenticación:', err);
      }
    });
  }
}
