import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  students = [
    {
      name: 'Ana Pérez',
      subject: 'Matemáticas',
      level: 'Universitario',
      description: 'Ofrezco tutorías de álgebra y cálculo.',
    },
    {
      name: 'Carlos Ruiz',
      subject: 'Física',
      level: 'Secundaria',
      description: 'Busco ayuda en física avanzada.',
    },
    {
      name: 'Laura Gómez',
      subject: 'Química',
      level: 'Universitario',
      description: 'Ofrezco asesorías en química orgánica.',
    },
  ];

  searchText: string = '';
  filteredStudents: { name: string; subject: string; level: string; description: string; }[] = [];

  constructor() {}

  ngOnInit() {
    this.filteredStudents = this.students;
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      return (
        student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        student.subject.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }

  contactStudent(student: { name: string; subject: string; level: string; description: string }) {
    alert(`Contacto iniciado con ${student.name}`);
  }
}
