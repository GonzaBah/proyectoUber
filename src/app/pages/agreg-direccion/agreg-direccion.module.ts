import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregDireccionPageRoutingModule } from './agreg-direccion-routing.module';

import { AgregDireccionPage } from './agreg-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregDireccionPageRoutingModule
  ],
  declarations: [AgregDireccionPage]
})
export class AgregDireccionPageModule {}
