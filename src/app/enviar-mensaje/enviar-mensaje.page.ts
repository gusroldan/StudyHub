import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.page.html',
  styleUrls: ['./enviar-mensaje.page.scss'],
})
export class EnviarMensajePage {

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

  sendMessage() {
    // Lógica para enviar el mensaje
    console.log('Mensaje enviado');
  }
}