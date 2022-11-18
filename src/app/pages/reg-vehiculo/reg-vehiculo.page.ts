import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Marca } from 'src/app/services/marca';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-reg-vehiculo',
  templateUrl: './reg-vehiculo.page.html',
  styleUrls: ['./reg-vehiculo.page.scss'],
})
export class RegVehiculoPage implements OnInit {
  user: Usuario;
  arrayMarca: Marca[];
  arrayUser: Usuario[];

  //Variables para el Auto
  patente: string;
  color: string;
  modelo: string;
  annio: number;
  marca: number;

  varProg: boolean = false;
  constructor(private alertController: AlertController, private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    })
   }

  
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Vehículo registrado!',
      subHeader: '¡Bienvenido conductor WayPlace!',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
  async registrarVeh(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.varProg = true;
    await sleep(1500);
    this.user.idRol = 1;
    await this.wayplaceDB.agregarAuto(this.patente, this.color, this.modelo, this.annio, this.user.id, this.marca);
    await this.wayplaceDB.editarUser(this.user.id, this.user.rut, this.user.nombre, this.user.apellido, this.user.correo, this.user.clave, this.user.idRol);
    
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/principal'], navigationExtras);
    this.presentAlert();
    this.varProg = false;
  }
  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchUsers().subscribe(item => {
          this.arrayUser = item;
        })
        this.wayplaceDB.fetchMarcas().subscribe(item => {
          this.arrayMarca = item;
        })
      }
    })
  }
}
