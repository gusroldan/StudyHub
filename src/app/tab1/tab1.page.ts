import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    document.getElementById('loginButton')?.addEventListener('click', () => this.login());
  }

  login() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (this.validateUser(username, password)) {
      // Navegar a la segunda pestaña (Tab2)
      this.navCtrl.navigateRoot('/tabs/tab2');
    } else {
      console.log('Credenciales inválidas');
    }
  }

  validateUser(username: string, password: string): boolean {
    return username === 'test' && password === 'test';
  }
}


