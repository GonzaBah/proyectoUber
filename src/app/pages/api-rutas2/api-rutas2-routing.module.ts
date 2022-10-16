import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiRutas2Page } from './api-rutas2.page';

const routes: Routes = [
  {
    path: '',
    component: ApiRutas2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiRutas2PageRoutingModule {}
