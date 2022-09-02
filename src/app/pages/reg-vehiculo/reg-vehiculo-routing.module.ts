import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegVehiculoPage } from './reg-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: RegVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegVehiculoPageRoutingModule {}
