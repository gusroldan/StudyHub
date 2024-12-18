import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqliteConnection: SQLiteConnection;
  private database!: SQLiteDBConnection;

  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase() {
    try {
      this.database = await this.sqliteConnection.createConnection('DB_USERS',
        false,
        'no-encryption',
        1,
        false);
      await this.database.open();
      
      await this.database.execute(`
        DROP TABLE IF EXISTS tutores;
        DROP TABLE IF EXISTS usuarios;
        `);

      await this.database.execute(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          apellido TEXT,
          annoestudiante TEXT,
          email TEXT,
          contrasena TEXT,
          descripcion TEXT,
          numero INTEGER,
          imgperfil TEXT,
          admin INTEGER DEFAULT 0
        );
      `);

      await this.database.execute(`
        CREATE TABLE IF NOT EXISTS tutores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          aprobado INTEGER,
          idUsuario INTEGER NOT NULL,
          FOREIGN KEY (idUsuario) REFERENCES usuarios(id) ON DELETE CASCADE
        );
      `);      
      
      const tables = await this.database.query("SELECT name FROM sqlite_master WHERE type='table'");

      const result = await this.database.query('SELECT * FROM usuarios');
      if (!result.values || result.values.length === 0) {
      await this.addUsuario('Mario', 'Gomez', '2do año', 'mariogo@duocuc.cl','mario1234','Especializado en SQL, Python, Javascript, HTML5, CSS', 912345678,'https://media.licdn.com/dms/image/v2/D4E03AQEh8F1jlVol6w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721709225694?e=1740009600&v=beta&t=ktcLZuVJ_JyCQzLZaOf3z2cdkH-PmcyfrV7ySK-YbMo', 0);
      await this.addUsuario('Matias', 'Alarcon', '1er año', 'matiasa@duocuc.cl','matias1234','Especializado en HTML5, CSS', 912345678,'', 0);
      await this.addUsuario('Luis', 'Acevedo', '1er año', 'luisace@duocuc.cl','luis1234','Especializado en SQL, Python, Javascript, HTML5', 912345678,'https://media.istockphoto.com/id/1438969575/es/foto/joven-estudiante-universitario-sonriente-con-auriculares-de-pie-en-un-aula.jpg?s=612x612&w=0&k=20&c=vYBEmD-AcLhEbM02BBKtTAFeIS4A0O71_RpS6KtMUk8=', 0);
      await this.addUsuario('Sofia', 'San Martin', '2do año', 'sofiasm@duocuc.cl','sofia1234','Especializado en Python, Javascript, HTML5, CSS', 912345678,'https://media.licdn.com/dms/image/v2/D4E03AQFo6zXPNC5uLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708945694568?e=1740009600&v=beta&t=0KRtVNUr3qNDptklnfktxFVvCBgGhjwnSQ2ANfdd4KQ', 0);
      await this.addUsuario('Jose', 'Vargas', '2do año', 'josev@duocuc.cl','jose1234','Especializado en Javascript, HTML5, CSS', 912345678,'https://media.licdn.com/dms/image/v2/D4D03AQGanp65V_ELfw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729889201646?e=1740009600&v=beta&t=DmdC4nbhmJ3G_oQ4Kx23ZH_iKNuY86UYwZ3nhsFERw4', 0);
      await this.addUsuario('Pedro', 'Mancilla', '', 'admin@example.com','admin','', 912345678,'', 1);
      console.log('datos insertados');
      for (let idUsuario = 1; idUsuario <= 4; idUsuario++) {
        await this.addTutor(1, idUsuario);
      }
      }

      console.log('Database initialized!');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async addUsuario(nombre: string ,apellido: string ,annoestudiante: string ,email: string ,contrasena: string ,descripcion: string ,numero: number ,imgperfil: string = '' ,admin: number) {
    const query = 'INSERT INTO usuarios (nombre ,apellido ,annoestudiante ,email ,contrasena ,descripcion ,numero ,imgperfil ,admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await this.database.run(query, [nombre ,apellido ,annoestudiante ,email ,contrasena ,descripcion ,numero ,imgperfil ,admin]);
  }

  async getUsuarios(): Promise<any[]> {
    const query = 'SELECT * FROM usuarios';
    const result = await this.database.query(query);
    return result.values ?? [];
  }

  async addTutor(aprobado: number, idUsuario: number) {
    const query = 'INSERT INTO tutores (aprobado, idUsuario) VALUES (?, ?)';
    await this.database.run(query, [aprobado, idUsuario]);
  }

  async getTutoresAprobados(): Promise<any[]> {
    const query = `
      SELECT u.id, u.nombre, u.apellido, u.annoestudiante, u.email, u.descripcion, u.imgperfil
      FROM tutores t
      INNER JOIN usuarios u ON t.idUsuario = u.id
      WHERE t.aprobado = 1
    `;
    const result = await this.database.query(query);
    return result.values ?? [];
  }
  
  async getTutoresNoAprobados(): Promise<any[]> {
    const query = `
      SELECT u.id, u.nombre, u.apellido, u.annoestudiante, u.email, u.descripcion, u.imgperfil
      FROM tutores t
      INNER JOIN usuarios u ON t.idUsuario = u.id
      WHERE t.aprobado = 0
    `;
    const result = await this.database.query(query);
    return result.values ?? [];
  }

  async approveTutor(idUsuario: number): Promise<void> {
    const query = 'UPDATE tutores SET aprobado = 1 WHERE idUsuario = ?';
    await this.database.run(query, [idUsuario]);
  }
  

  async validateUser(email: string, password: string) {
    if (!this.database) {
      await this.initializeDatabase();
    }
  
    const result = await this.database.query(
      'SELECT id, admin FROM usuarios WHERE email = ? AND contrasena = ?',
      [email, password]
    );
  
    return result.values && result.values.length > 0
      ? { id: result.values[0].id, admin: Number(result.values[0].admin) }
      : null;
  }
  
  

}
