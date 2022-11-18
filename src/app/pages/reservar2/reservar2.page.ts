import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiRestService } from 'src/app/api-rest.service';


@Component({
  selector: 'app-reservar2',
  templateUrl: './reservar2.page.html',
  styleUrls: ['./reservar2.page.scss'],
})
export class Reservar2Page implements OnInit {
  hideMe: boolean;
  users: any;
  autos: any;

  constructor(private alertController: AlertController, private api: ApiRestService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe((rrr)=>{
      console.log(rrr)
      this.users=rrr;
    },(error)=>{
      console.log(error);
    })

    this.api.getAutos().subscribe((res)=>{
      this.autos=res;
      console.log(res.marca)
      },(error)=>{
      console.log(error);
      })
     
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
