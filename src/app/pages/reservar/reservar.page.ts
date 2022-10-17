declare var google: any;

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {


  constructor(private GeoLocalizacion: Geolocation) {

  }
  ngOnInit(): void {
    
  }
}
