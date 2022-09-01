import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Reservar2PageRoutingModule } from './reservar2-routing.module';

import { Reservar2Page } from './reservar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Reservar2PageRoutingModule
  ],
  declarations: [Reservar2Page]
})
export class Reservar2PageModule {}
