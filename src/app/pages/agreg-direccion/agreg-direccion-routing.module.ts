import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregDireccionPage } from './agreg-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregDireccionPageRoutingModule {}
