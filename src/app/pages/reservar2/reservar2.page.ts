import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reservar2',
  templateUrl: './reservar2.page.html',
  styleUrls: ['./reservar2.page.scss'],
})
export class Reservar2Page implements OnInit {
  hideMe: boolean;

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: '¿Seguro de reservar?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
        },
      ],
    });
    await alert.present();
  }

  show(){
    this.hideMe = !this.hideMe;
  }

}
