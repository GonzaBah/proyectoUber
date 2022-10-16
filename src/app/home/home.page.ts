import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, ToastController, Animation } from '@ionic/angular';
import { ApiRestService } from '../api-rest.service';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { SqliteService } from '../services/sqlite.service';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //Usuarios predefinidos

  users: any;
  autos: any;

  varProg: boolean = false;

  correo: string = "";
  pass: string = "";
  arrayUser: Usuario[] = [];
  

  constructor(public toastController: ToastController, private router: Router, private animationCtrl: AnimationController, private wayplaceDB: SqliteService, private api: ApiRestService) {
    
  }
  
  async inicioToast(var1: string){
    const toast = await this.toastController.create({
      message: 'Bienvenido ' + var1,
      duration: 1500
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Correo o Contraseña invalido',
      duration: 2000
    });
    toast.present();
  }
  async login() {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let ini = 0;
    this.varProg = true;
    await sleep(1500);
    for(let i of this.arrayUser){
      if(this.correo == i.correo && this.pass == i.clave){
        let navigationExtras: NavigationExtras = {
          state: {
            user: i
          }
        }
        this.inicioToast(i.nombre);
        await this.router.navigate(['/principal'], navigationExtras);
        ini++;
        break;
      }else{
        console.log("Siguiente Usuario");
      }
    }
    if (ini == 0){
      this.errorToast();
    }
    this.varProg = false;
  }

  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchUsers().subscribe(item => {
          this.arrayUser = item;
        })
      }
    })
    this.api.getUsers().subscribe((rrr)=>{
      this.users=rrr;
    },(error)=>{
      console.log(error);
    })

    this.api.getAutos().subscribe((res)=>{
      this.autos=res;
      },(error)=>{
      console.log(error);
      })
  }
}

