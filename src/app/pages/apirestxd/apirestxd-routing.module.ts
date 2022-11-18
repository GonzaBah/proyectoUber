import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApirestxdPage } from './apirestxd.page';

const routes: Routes = [
  {
    path: '',
    component: ApirestxdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApirestxdPageRoutingModule {}
