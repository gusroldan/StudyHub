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
    authService.isAuthenticated();
  }

  login(event: Event) {
    event.preventDefault();
    
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/tabs']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        console.error('Error de autenticación:', err);
      }
    });
  }
}
