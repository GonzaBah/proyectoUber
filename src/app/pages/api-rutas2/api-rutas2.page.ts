///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { alertController } from '@ionic/core';
@Component({
  selector: 'app-api-rutas2',
  templateUrl: './api-rutas2.page.html',
  styleUrls: ['./api-rutas2.page.scss'],
})
export class ApiRutas2Page implements OnInit {
  
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;
  originPlaceId: string;
  destinationPlaceId: string;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  travelMode: google.maps.TravelMode.DRIVING;

  constructor(private renderer: Renderer2, private GeoLocalizacion: Geolocation) { 
    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
    });

    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.markers = [];
 
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.GeoLocalizacion.getCurrentPosition().then((r) => {

      this.cargarMapa(r)

      // this.Autocompleto()

    }).catch(async (error) => {
      const alert = await alertController.create({
        message: 'Se necesita activar la ubicación del dispositivo',
      });
      await alert.present();
      console.log('Error', error);
    });

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.cargarMapa(position);
        this.cargarAutocomplete();

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };

  //Autocomplete google

  // Autocompleto(){

  //   let origen = (document.getElementById('origin-input') as HTMLInputElement).value;
  //   let destineishon = (document.getElementById('destination-input') as HTMLInputElement).value;

  //   const originAutocomplete = new google.maps.places.Autocomplete(
  //     origen,
  //     { fields: ["place_id"] }
  //   );

  //   // Specify just the place data fields that you need.
  //   const destinationAutocomplete = new google.maps.places.Autocomplete(
  //     destineishon,
  //     { fields: ["place_id"] }
  //   );

  //   this.setupPlaceChangedListener(originAutocomplete, "ORIG");
  //   this.setupPlaceChangedListener(destinationAutocomplete, "DEST");


  // }


  //Autocomplete tutorial
  private cargarAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputPlaces.nativeElement), {
      componentRestrictions: {
        country: ["CL"]
      },
      fields: ["address_components", "geometry"],
      types: ["address"],
    })


    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();
      console.log("el place completo es:", place)

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });

      marker.setMap(this.mapa);
    })
  }



  //calcular ruta
  mapRuta() {

  

    this.directionsRenderer.setMap(this.mapa);

    this.directionsService.route({

      origin: { placeId: this.originPlaceId },
      destination: { placeId: this.destinationPlaceId },
      travelMode: this.travelMode,

    }, resultado => {
      console.log(resultado);
      this.directionsRenderer.setDirections(resultado);

      this.distancia = resultado.routes[0].legs[0].distance.text;

    });

  }






  cargarMapa(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "🥵",
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  };

  setupPlaceChangedListener(
    autocomplete: google.maps.places.Autocomplete,
    mode: string
  ) {
    autocomplete.bindTo("bounds", this.mapa);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

}
