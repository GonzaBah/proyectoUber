import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  categories: Category[] = [];

  constructor() { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categories = [
      {
        id: 1,
        label:'Billetera',
        image: 'assets/images/icons/auto2.png',
        active: true,
      },
      {
        id: 2,
        label:'Ajustes',
        image: 'assets/images/auto.jpg',
        active:true,
      },
      {
        id: 3,
        label:'Fumo?',
        image: 'assets/images/auto.jpg',
        active:false,
      },
    ];
  }

}
