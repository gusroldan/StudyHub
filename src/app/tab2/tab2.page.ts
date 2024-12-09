import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: any = {};

  constructor(private navCtrl: NavController, private userService: UserService) {
    this.user = this.userService.getUser();
  }

  IrAEnviarMensaje() {
    this.navCtrl.navigateForward('/enviar-mensaje');
  }
}