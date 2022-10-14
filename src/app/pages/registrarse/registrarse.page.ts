import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  nom: string = "";
  apell: string = "";
  rut: string = "";
  correo: string = "";
  pass: string = "";
  pass2: string = "";
  rol: number = 0;

  arrayUser: Usuario[] = [];

  constructor(public toastController: ToastController, private router: Router, private wayplaceDB: SqliteService) { }

  async regToast(){
    const toast = await this.toastController.create({
      message: 'Se ha registrado correctamente',
      duration: 1500
    });
    toast.present();
  }

  async errorToast(err){
    const toast = await this.toastController.create({
      message: 'Hubo un error en el registro, '+err,
      duration: 1500
    });
    toast.present();
  }

  registrarse(){
    let regex: RegExp = /^(?=.{1,}\d)(?=.*[a-z])(?=.{1,}[A-Z])(?=.*[a-zA-Z]).{4,}$/g;
    let valid = false;
    for (let i of this.arrayUser){
      if(this.correo == i.correo || this.rut == i.rut){
        valid = true;
      }
    }
    if (valid){
      this.errorToast("el usuario ya existe");
    }else if (this.pass != this.pass2){
      this.errorToast("las contraseñas no coinciden");
    }else if (!regex.test(this.pass)){
      this.errorToast("la contraseña debe tener´al menos 1 mayúscula, 1 minúscula y 1 número");
    }else{
      this.wayplaceDB.agregarUser(this.rut, this.nom, this.apell, this.correo, this.pass, this.rol);
      this.regToast();
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchUsers().subscribe(item => {
          this.arrayUser = item;
        })
      }
    })
  }

}
