import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mapaqliao2PageRoutingModule } from './mapaqliao2-routing.module';

import { Mapaqliao2Page } from './mapaqliao2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mapaqliao2PageRoutingModule
  ],
  declarations: [Mapaqliao2Page]
})
export class Mapaqliao2PageModule {}
