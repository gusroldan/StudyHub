import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user: any = {};

  constructor(private userService: UserService, private navCtrl: NavController) {
    this.user = this.userService.getUser();
  }

  toggleTutor() {
    this.userService.updateUser(this.user);
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Redirigir a la página de inicio de sesión
    this.navCtrl.navigateRoot('/login');
  }
}