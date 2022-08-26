import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SerAfiliadoPage } from './ser-afiliado.page';

const routes: Routes = [
  {
    path: '',
    component: SerAfiliadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerAfiliadoPageRoutingModule {}
