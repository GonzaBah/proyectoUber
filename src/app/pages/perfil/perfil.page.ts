import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  categories: Category[] = [];

  user: Usuario;
  constructor(private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    })
   }

  ngOnInit() {
    this.getCategories();
  }

  editarPerfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
      }
    }
    this.router.navigate(['/editar-cuenta'], navigationExtras);
  }
  serAfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/ser-afiliado'], navigationExtras);
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
        active:true,
      },
    ];
  }

}
