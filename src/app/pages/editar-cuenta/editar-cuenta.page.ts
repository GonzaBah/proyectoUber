import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';
import { CamaraApiService } from 'src/app/services/camara-api.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {
  varEd: boolean = false;
  varPass: boolean = false;

  arrayUser: Usuario[];
  user: Usuario;

  
  constructor(private toastController: ToastController, private photoService: CamaraApiService, private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    })

   }
  
  tomarFoto(){
    this.photoService.takePicture();
  }

  async msgToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  editarPf(){
    this.varEd = true;
  }
  editarPass(){
    this.varPass = true;
  }
  async confirmPf(){
    let valid = true;
    let msg = "";
    //Variables extraídas del HTML para editar
    let nom = document.getElementById('nomEd') as HTMLInputElement;
    let apell = document.getElementById('apellEd') as HTMLInputElement;
    let correo = document.getElementById('correoEd') as HTMLInputElement;
    let rut = document.getElementById('rutEd') as HTMLInputElement;

    for (let i of this.arrayUser){
      if (correo.value == i.correo || rut.value == i.rut){
        if (i.correo != this.user.correo || i.rut != this.user.rut){
          valid = false;
        }
      }
    }

    if(valid){
      //Definiendo esas Variables en el usuario actual
      this.user.nombre = nom.value;
      this.user.apellido = apell.value;
      this.user.correo = correo.value;
      this.user.rut = rut.value;
      
      await this.wayplaceDB.editarUser(this.user.id, this.user.rut, this.user.nombre, this.user.apellido, this.user.correo, this.user.clave, this.user.idRol);
      
      await this.msgToast("¡Perfil Editado Exitosamente!");
    }else{
      await this.msgToast("Error: Correo o Rut ya existe");
    }
    
    this.varEd = false;
  }
  async confirmPass(){
    let regex: RegExp = /^(?=.{1,}\d)(?=.*[a-z])(?=.{1,}[A-Z])(?=.*[a-zA-Z]).{6,}$/g;
    let pass1 = document.getElementById("passEd1") as HTMLInputElement;
    let pass2 = document.getElementById("passEd2") as HTMLInputElement;
    let pass3 = document.getElementById("passEd3") as HTMLInputElement;

    if (pass1.value == this.user.clave){
      if (pass2.value == pass3.value && regex.test(pass2.value)){
        this.user.clave = pass2.value;
        await this.wayplaceDB.editarUser(this.user.id, this.user.rut, this.user.nombre, this.user.apellido, this.user.correo, this.user.clave, this.user.idRol);
        this.msgToast("¡Cambio de Contraseña Exitoso!")
        this.varPass = false;
      }else if(!regex.test(pass2.value)){
        this.msgToast("La contraseña debe tener´al menos UNA mayúscula, UNA minúscula y UN número");
      }
      else{
        this.msgToast("Las nuevas contraseñas no coinciden")
      }
    }else{
      this.msgToast("Tu antigua contraseña no coincide")
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
