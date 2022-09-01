import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reg-vehiculo',
  templateUrl: './reg-vehiculo.page.html',
  styleUrls: ['./reg-vehiculo.page.scss'],
})
export class RegVehiculoPage implements OnInit {

  constructor(private alertController: AlertController) { }

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
}
