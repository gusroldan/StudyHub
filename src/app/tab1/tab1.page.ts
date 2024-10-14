import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
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
