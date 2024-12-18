import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  admin: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const admin = localStorage.getItem('admin');
    this.admin = admin ? Number(admin) : null; // Convierte el valor de admin a número
    console.log('Valor de admin desde localStorage:', this.admin);
  }  
}
