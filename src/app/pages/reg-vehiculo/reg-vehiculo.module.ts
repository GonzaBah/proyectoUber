import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegVehiculoPageRoutingModule } from './reg-vehiculo-routing.module';

import { RegVehiculoPage } from './reg-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegVehiculoPageRoutingModule
  ],
  declarations: [RegVehiculoPage]
})
export class RegVehiculoPageModule {}
