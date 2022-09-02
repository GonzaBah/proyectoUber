import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  tipo: number = 0;
  answer: any = "1";

  constructor(private alertController: AlertController, private router: Router, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.tipo = this.router.getCurrentNavigation().extras.state.tipo;
      }
    })
   }

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
