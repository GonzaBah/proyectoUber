import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GugolmapoPage } from './gugolmapo.page';

const routes: Routes = [
  {
    path: '',
    component: GugolmapoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GugolmapoPageRoutingModule {}
