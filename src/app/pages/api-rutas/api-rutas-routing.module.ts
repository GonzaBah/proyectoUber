import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiRutasPage } from './api-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: ApiRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRutasPageRoutingModule {}
