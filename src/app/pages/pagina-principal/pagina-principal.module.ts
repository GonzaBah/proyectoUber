import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { PaginaPrincipalPageRoutingModule } from './pagina-principal-routing.module';

import { PaginaPrincipalPage } from './pagina-principal.page';
import { GooglemapsComponent } from 'src/app/googlemaps/googlemaps.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaPrincipalPageRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    GooglemapsComponent
  ],
  declarations: [PaginaPrincipalPage]
})
export class PaginaPrincipalPageModule {}
