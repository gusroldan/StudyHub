import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: any = {};
  usuarios: any[] = [];
  tutores: any[] = [];

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private db: SqliteService
  ) {
    this.user = this.userService.getUser();
  }

  async ngOnInit() {
    try {
      this.usuarios = await this.db.getUsuarios();
      this.tutores = await this.db.getTutoresAprobados();
      console.log('Usuarios:', JSON.stringify(this.usuarios, null, 2));
      console.log('Usuarios:', JSON.stringify(this.tutores, null, 2));
    } catch (error) {
      console.error('Error during database initialization or queries:', error);
    }
  }

  IrAEnviarMensaje() {
    this.navCtrl.navigateForward(`/enviar-mensaje`);
  }
}
