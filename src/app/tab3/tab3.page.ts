import { Component} from '@angular/core';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  user: any = {};

  constructor( private userService: UserService, private navCtrl: NavController, private database: SqliteService) {
    this.user = this.userService.getUser();
  }

  // Método para alternar el estado de tutor
  toggleTutor() {
    this.userService.updateUser(this.user);
  }

  // Método para cerrar sesión
  logout() {
    console.log('Cerrando sesión...');
    this.navCtrl.navigateRoot('/login');
  }

  agregarTutor() {
    // Obtener el idUsuario desde localStorage
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    
    if (idUsuario) {
      this.database.addTutor(0, idUsuario)
        .then(() => {
          console.log('Tutor agregado exitosamente');
          alert('Postulado exitosamente');
        })
        .catch(error => {
          console.error('Error al agregar tutor:', error);
          alert('Error al postular');
        });
    } else {
      console.log('No se encontró el idUsuario en el localStorage');
    }
  }
  // Método para capturar la foto
  async takeProfilePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Guardar como base64 para almacenarlo en localStorage
        source: CameraSource.Camera, // Usar la cámara directamente
      });

      // Guardar la foto en el usuario y en localStorage
      this.user.profilePhoto = `data:image/jpeg;base64,${image.base64String}`;
      this.userService.updateUser(this.user);

      // Almacenar la foto en localStorage
      localStorage.setItem('userProfilePhoto', this.user.profilePhoto);
      console.log('Foto de perfil guardada exitosamente.');
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
