import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarMensajePage } from './enviar-mensaje.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarMensajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarMensajePageRoutingModule {}
