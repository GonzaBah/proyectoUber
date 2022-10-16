import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  marca: string = "Nissan";
  modelo: string = "370Z";
  patente: string = "AA-AA-12";

  varEd: number = 0;

  constructor() { }

  editarVeh(ed: number){
    this.varEd = ed;
  }
  ngOnInit() {
  }

}
