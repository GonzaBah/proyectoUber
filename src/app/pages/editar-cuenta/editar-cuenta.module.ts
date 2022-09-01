import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCuentaPageRoutingModule } from './editar-cuenta-routing.module';

import { EditarCuentaPage } from './editar-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCuentaPageRoutingModule
  ],
  declarations: [EditarCuentaPage]
})
export class EditarCuentaPageModule {}
