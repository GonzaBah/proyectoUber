import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mapaqliao3PageRoutingModule } from './mapaqliao3-routing.module';

import { Mapaqliao3Page } from './mapaqliao3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mapaqliao3PageRoutingModule
  ],
  declarations: [Mapaqliao3Page]
})
export class Mapaqliao3PageModule {}
