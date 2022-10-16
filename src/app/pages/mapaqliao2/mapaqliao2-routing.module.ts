import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mapaqliao2Page } from './mapaqliao2.page';

const routes: Routes = [
  {
    path: '',
    component: Mapaqliao2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mapaqliao2PageRoutingModule {}
