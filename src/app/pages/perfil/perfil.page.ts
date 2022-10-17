import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Auto } from 'src/app/services/auto';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  categories: Category[] = [];
  foto: any;

  user: Usuario;
  arrayAuto: Auto[];

  constructor(private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    })
   }

  async verVehiculo(){
    let auto: Auto;

    for (let i of this.arrayAuto){
      console.log("PRUEBA "+i+": "+JSON.stringify(i)+" "+this.user.id);
      if(i.idUsuario == this.user.id){
        auto = i;
        console.log("PRUEBA: "+JSON.stringify(auto));
      }
    }
    if(auto){
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user,
          auto: auto
        }
      }
      await this.router.navigate(['/vehiculo'], navigationExtras);
    }else{
      console.log("VEHICULO NO ESTA REGISTRADO");
    }
    
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
  ngOnInit() {
    this.getCategories();
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchAutos().subscribe(item => {
          this.arrayAuto = item;
        })
      }
    })

  }
}
