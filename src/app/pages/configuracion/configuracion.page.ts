import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/models';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  cliente: Cliente = {
    ubicacion: null,
  };
  
  
  constructor(private modalController:  ModalController, private gugu: GooglemapsComponent) { }

  ngOnInit() {
    
  }

  async addDirection(){
    this.gugu.init();
    const ubicacion = this.cliente.ubicacion
    let positionInput = {
      lat: -2.898116,
      lng: -78.99958149999999
    };
    if (ubicacion !== null) {
      positionInput = ubicacion;
    }
    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position: positionInput}
    });
    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data ->', data);
      this.cliente.ubicacion = data.pos;
      console.log('this.cliente ->', this.cliente);
    }
  }

  

}
