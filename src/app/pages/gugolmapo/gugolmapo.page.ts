import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    initMap: () => void;
    
  }
  
}

declare var google: any;
@Component({
  selector: 'app-gugolmapo',
  templateUrl: './gugolmapo.page.html',
  styleUrls: ['./gugolmapo.page.scss'],
})


export class GugolmapoPage implements OnInit {
  map: any;

  
  constructor() { }

  ngOnInit() {
    
  }
  

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 12
    });
  
  }
  


  

}



