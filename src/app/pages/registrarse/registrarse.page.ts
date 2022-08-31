import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  u: string = "";
  p: string = "";
  a: boolean = false;
  n: string = "";
  f: string = "";
  r: string = "";
  fe: string = "01-01";

  constructor(public toastController: ToastController, private router: Router) { }

  async regToast(){
    const toast = await this.toastController.create({
      message: 'Se ha registrado correctamente',
      duration: 1500
    });
    toast.present();
  }

  registrarse(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.u,
        pass: this.p,
        afil: this.a,
        name: this.n,
        fono: this.f,
        rut: this.r,
      }
    }
    this.regToast();
    this.router.navigate(['/principal'], navigationExtras);
  }

  ngOnInit() {
  }

}
