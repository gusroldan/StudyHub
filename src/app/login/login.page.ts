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
    // Verifica si el usuario ya está autenticado
    this.authService.isAuthenticated();
  }

  login(event: Event) {
    event.preventDefault();

    // Llamamos al login sin pasar email y password, ya que los valores están definidos en AuthService
    this.authService.login().subscribe({
      next: () => {
        // Redirige a la página de tabs después del login exitoso
        this.router.navigate(['/tabs']);
      },
      error: (err) => {
        // Si ocurre un error, mostramos un mensaje de error
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        console.error('Error de autenticación:', err);
      }
    });
  }
}
