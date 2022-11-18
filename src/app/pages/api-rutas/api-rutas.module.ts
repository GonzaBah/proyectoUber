import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiRutasPageRoutingModule } from './api-rutas-routing.module';

import { ApiRutasPage } from './api-rutas.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiRutasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApiRutasPage]
})
export class ApiRutasPageModule {}
