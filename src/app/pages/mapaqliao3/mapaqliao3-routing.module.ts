import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mapaqliao3Page } from './mapaqliao3.page';

const routes: Routes = [
  {
    path: '',
    component: Mapaqliao3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mapaqliao3PageRoutingModule {}
