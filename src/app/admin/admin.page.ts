import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  tutoresNoAprobados: any[] = []; // Lista de tutores no aprobados
  isLoading = true; // Indicador de carga

  constructor(private sqliteService: SqliteService) {}

  async ngOnInit() {
    await this.loadTutoresNoAprobados();
  }

  async loadTutoresNoAprobados() {
    this.isLoading = true;
    try {
      this.tutoresNoAprobados = await this.sqliteService.getTutoresNoAprobados();
    } catch (error) {
      console.error('Error al cargar tutores no aprobados:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async approveTutor(idUsuario: number) {
    try {
      await this.sqliteService.approveTutor(idUsuario);
      // Actualiza la lista después de aprobar
      await this.loadTutoresNoAprobados();
    } catch (error) {
      console.error('Error al aprobar tutor:', error);
    }
  }
}
