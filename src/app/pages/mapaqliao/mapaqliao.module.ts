import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaqliaoPageRoutingModule } from './mapaqliao-routing.module';

import { MapaqliaoPage } from './mapaqliao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaqliaoPageRoutingModule
  ],
  declarations: [MapaqliaoPage]
})
export class MapaqliaoPageModule {}
