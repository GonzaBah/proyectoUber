import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionPageRoutingModule } from './configuracion-routing.module';

import { ConfiguracionPage } from './configuracion.page';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionPageRoutingModule,
  ],
  providers: [
    GooglemapsComponent
  ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
