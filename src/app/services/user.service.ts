import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = {
    name: 'Cristofer Rivas',
    phone: '+569 4354 2378',
    email: 'KenziSSG@duocuc.cl',
    description: 'Estudiante de Ingeniería en Informática en Duoc UC. Me gusta la programación y la tecnología, he realizado cursos de python pero base de datos es mi debilidad.',
    isTutor: false,
    profilePicture: 'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk='
  };

  getUser() {
    return this.user;
  }

  updateUser(user: any) {
    this.user = user;
  }
}