import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, ToastController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Usuarios predefinidos
  usuario1: string[] = ["user@mail.com", "1234", "0", "User Name", "+12345678"];
  usuario2: string[] = ["chimba@rongo.com", "chimba", "1", "Chimba Rongo", "+569 Peor es Nada"];
  
  usuario: string = "";
  contrasenia: string = "";
  afilState: boolean = false;
  nombre: string = "";
  telefono: string = "";

  constructor(public toastController: ToastController, private router: Router, private animationCtrl: AnimationController) {

   
  }

  async inicioToast(){
    const toast = await this.toastController.create({
      message: 'La Sesión se ha iniciado correctamente',
      duration: 2000
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
  login(){
    if (this.usuario == this.usuario1[0]){
      if (this.contrasenia == this.usuario1[1]){
        console.log("Sesion iniciada " + this.usuario)
        this.nombre = this.usuario1[3];
        this.telefono = this.usuario1[4];
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
            fono: this.telefono
          }
        }
        
        this.inicioToast();
        this.router.navigate(['/principal'], navigationExtras);
      }else{
        console.log("Contraseña Incorrecta")
        this.errorToast();
      }
      

    }else if(this.usuario == this.usuario2[0]){
      if (this.contrasenia == this.usuario2[1]){
        console.log("Sesion iniciada " + this.usuario)
        this.nombre = this.usuario2[3];
        this.telefono = this.usuario2[4];
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
            fono: this.telefono
          }
        }
        
        this.inicioToast();
        this.router.navigate(['/principal'], navigationExtras);
      }else{
        console.log("Contraseña Incorrecta")
        this.errorToast();
      }
    }else{
      this.errorToast();
    }
  }
}

