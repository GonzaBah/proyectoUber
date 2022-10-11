import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, ToastController, Animation } from '@ionic/angular';
import { ApiRestService } from '../api-rest.service';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  //Usuarios predefinidos
  usuario1: any[] = ["user@mail.com", "1234", false, "User Name", "+12345678", "111-1", "01-20"];
  usuario2: any[] = ["chimba@rongo.com", "chimba", true, "Chimba Rongo", "+569 Peor es Nada", "222-2", "02-20"];

  users: any;
  autos: any;

  varProg: boolean = false;

  usuario: string = "";
  contrasenia: string = "";
  afilState: boolean = false;
  nombre: string = "";
  telefono: string = "";
  rut: string = "";

  

  constructor(public toastController: ToastController, private router: Router, private animationCtrl: AnimationController, private wayplaceDB: SqliteService, private api: ApiRestService) {
    
  }

  ngOnInit(): void {
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

  
  async inicioToast(var1: string){
    const toast = await this.toastController.create({
      message: 'Bienvenido '+var1,
      duration: 1500
    });
    toast.present();
  }
  
  async errorToast(){
    const toast = await this.toastController.create({
      message: 'Correo o Contraseña invalido',
      duration: 2000
    });
    toast.present();
  }
  async login(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.varProg = true;
    await sleep(1500);
    if (this.usuario == this.usuario1[0] && this.contrasenia == this.usuario1[1]){
        console.log("Sesion iniciada " + this.usuario)
        this.nombre = this.usuario1[3];
        this.telefono = this.usuario1[4];
        this.rut = this.usuario1[5];
        if (this.usuario1[2] == "0"){
          this.afilState = false;
        }else{
          this.afilState = true;
        }
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.usuario,
            pass: this.contrasenia,
            afil: this.afilState,
            name: this.nombre,
            fono: this.telefono,
            rut: this.rut,
          }
        }
        
        this.inicioToast(this.nombre);
        this.router.navigate(['/principal'], navigationExtras);
    
    }else if(this.usuario == this.usuario2[0] && this.contrasenia == this.usuario2[1]){
        console.log("Sesion iniciada " + this.usuario)
        this.nombre = this.usuario2[3];
        this.telefono = this.usuario2[4];
        this.rut = this.usuario2[5];
        if (this.usuario2[2] == "0"){
          this.afilState = false;
        }else{
          this.afilState = true;
        }
        let navigationExtras: NavigationExtras = {
          state: {
            user: this.usuario,
            pass: this.contrasenia,
            afil: this.afilState,
            name: this.nombre,
            fono: this.telefono,
            rut: this.rut,
          }
        }
        
        this.inicioToast(this.nombre);
        this.router.navigate(['/principal'], navigationExtras);
    }else{
      this.errorToast();
    }
    this.varProg = false;
  }
}

