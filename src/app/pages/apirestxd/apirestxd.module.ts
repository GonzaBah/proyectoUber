import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApirestxdPageRoutingModule } from './apirestxd-routing.module';

import { ApirestxdPage } from './apirestxd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApirestxdPageRoutingModule
  ],
  declarations: [ApirestxdPage]
})
export class ApirestxdPageModule {}
