import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { CamaraApiService } from 'src/app/services/camara-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  categories: Category[] = [];
  foto: any;

  u: string = "";
  p: string = "";
  a: boolean = false;
  n: string = "";
  f: string = "";
  r: string = "";
  fe: string = "01-01";

  constructor(private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u = this.router.getCurrentNavigation().extras.state.user;
        this.p = this.router.getCurrentNavigation().extras.state.pass;
        this.a = this.router.getCurrentNavigation().extras.state.afil;
        this.n = this.router.getCurrentNavigation().extras.state.name;
        this.f = this.router.getCurrentNavigation().extras.state.fono;
        this.r = this.router.getCurrentNavigation().extras.state.rut;
      }
    })
   }


  ngOnInit() {
    this.getCategories();


  }

  editarPerfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.u,
        pass: this.p,
        afil: this.a,
        name: this.n,
        fono: this.f
      }
    }
    this.router.navigate(['/editar-cuenta'], navigationExtras);
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
