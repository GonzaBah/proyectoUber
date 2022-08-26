import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SerAfiliadoPageRoutingModule } from './ser-afiliado-routing.module';

import { SerAfiliadoPage } from './ser-afiliado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SerAfiliadoPageRoutingModule
  ],
  declarations: [SerAfiliadoPage]
})
export class SerAfiliadoPageModule {}
