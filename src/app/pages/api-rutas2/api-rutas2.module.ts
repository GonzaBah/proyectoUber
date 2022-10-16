import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiRutas2PageRoutingModule } from './api-rutas2-routing.module';

import { ApiRutas2Page } from './api-rutas2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiRutas2PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApiRutas2Page]
})
export class ApiRutas2PageModule {}
