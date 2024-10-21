import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; 
  password: string = ''; 
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const isLoggedIn = this.authService.login(this.username, this.password); 
    if (isLoggedIn) {
      this.router.navigate(['/tabs']); 
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'; 
    }
  }
}
