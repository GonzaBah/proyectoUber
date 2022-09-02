import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reg-vehiculo',
  templateUrl: './reg-vehiculo.page.html',
  styleUrls: ['./reg-vehiculo.page.scss'],
})
export class RegVehiculoPage implements OnInit {
  a: boolean = false;
  varProg: boolean = false;
  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Vehículo registrado!',
      subHeader: '¡Bienvenido conductor UwUber!',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
  async registrarVeh(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.varProg = true;
    await sleep(1500);
    this.a = true;
    let navigationExtras: NavigationExtras = {
      state: {
        afil: this.a,
      }
    }
    this.router.navigate(['/principal'], navigationExtras);
    this.presentAlert();
    this.varProg = false;
  }
}
