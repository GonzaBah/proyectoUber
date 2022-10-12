import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController, ToastController, Animation } from '@ionic/angular';
import { SqliteService } from '../services/sqlite.service';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //Usuarios predefinidos

  varProg: boolean = false;

  correo: string = "";
  pass: string = "";

  arrayUsers: any = [
    {
      id: '',
      rut: '',
      nombre: '',
      apellido: '',
      correo: '',
      clave: '',
      rolId: '',
    }

  ]

  constructor(public toastController: ToastController, private router: Router, private animationCtrl: AnimationController, private wayplaceDB: SqliteService) {

  }


  async inicioToast(var1: string) {
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
    let users: Usuario[] = [];
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.varProg = true;
    await sleep(1500);
    /*this.wayplaceDB.database.executeSql("select * from usuario", []).then(function (data) {
      for (let i = 0; i < data.rows.length; i++) {
        users[i] = ({
          id: data.rows.item(i).idusuario,
          rut: data.rows.item(i).rut,
          nombre: data.rows.item(i).nombre,
          apellido: data.rows.item(i).apellido,
          correo: data.rows.item(i).correo,
          clave: data.rows.item(i).clave,
          idRol: data.rows.item(i).id_rol
        });
      }
      console.log("USUARIO 0: "+users[0].correo);
    }).catch((e) => {
      console.log("HUBO UN ERROR EN EL SELECT FROM USUARIO")
    })*/
    this.varProg = false;
  }

  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchUsers().subscribe(item => {
          this.arrayUsers = item;
        })
      }
    })
  }
}

