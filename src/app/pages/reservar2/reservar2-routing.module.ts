import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Reservar2Page } from './reservar2.page';

const routes: Routes = [
  {
    path: '',
    component: Reservar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Reservar2PageRoutingModule {}
