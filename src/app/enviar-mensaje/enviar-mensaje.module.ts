import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarMensajePageRoutingModule } from './enviar-mensaje-routing.module';

import { EnviarMensajePage } from './enviar-mensaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarMensajePageRoutingModule
  ],
  declarations: [EnviarMensajePage]
})
export class EnviarMensajePageModule {}
