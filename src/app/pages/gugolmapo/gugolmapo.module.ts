import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GugolmapoPageRoutingModule } from './gugolmapo-routing.module';

import { GugolmapoPage } from './gugolmapo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GugolmapoPageRoutingModule
  ],
  declarations: [GugolmapoPage]
})
export class GugolmapoPageModule {}
