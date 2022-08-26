import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina4',
  templateUrl: './pagina4.page.html',
  styleUrls: ['./pagina4.page.scss'],
})
export class Pagina4Page implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      subHeader: '¡Vehículo registrado!',
      message: 'Bienvenido conductor UwUber',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
}
