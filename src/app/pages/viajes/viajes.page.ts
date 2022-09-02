import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  answer: any = "1";

  constructor(private alertController: AlertController) { }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: '¿Seguro de seleccionar a Walter Blanco?',
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

  ngOnInit() {
  }

  selectDriver(opt: any){
    if(this.answer == opt){
      
    }
  }

}
