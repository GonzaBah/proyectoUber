import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare var google;




@Component({
  selector: 'app-api-rutas',
  templateUrl: './api-rutas.page.html',
  styleUrls: ['./api-rutas.page.scss'],
})
export class ApiRutasPage {

  

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  origin: any;
  destination: any;
  


  constructor(private GeoLocalizacion: Geolocation) {
    this.origin = "";
    this.destination = "";


   }

  




  async ngAfterViewInit() {
    this.GeoLocalizacion.getCurrentPosition().then((r) => {

      this.loadMap(r)

      this.Autocompleto()

    })

  }

  

  Autocompleto(){

    let origen = (document.getElementById('origin-input') as HTMLInputElement).value;
    let destineishon = (document.getElementById('destination-input') as HTMLInputElement).value;

    const originAutocomplete = new google.maps.places.Autocomplete(
      origen,
      { fields: ["place_id"] }
    );

    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destineishon,
      { fields: ["place_id"] }
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");


  }

  loadMap(position: any): any {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 12
    });
  
    this.directionsDisplay.setMap(this.map);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.route();
    });
  }
    private calculateRoute() {
      this.directionsService.route({
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response, status)  => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
      }

      setupPlaceChangedListener(
        autocomplete: google.maps.places.Autocomplete,
        mode: string
      ) {
        autocomplete.bindTo("bounds", this.map);
    
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
    
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
    
          if (mode === "ORIG") {
            this.origin = place.place_id;
          } else {
            this.destination = place.place_id;
          }
    
          this.route();
        });
      }

        route() {
        if (!this.origin || !this.destination) {
          return;
        }
    
        const me = this;
    
        this.directionsService.route(
          {
            origin: { placeId: this.origin },
            destination: { placeId: this.destination },
          },
          (response, status) => {
            if (status === "OK") {
              me.directionsDisplay.setDirections(response);
            } else {
              window.alert("Directions request failed due to " + status);
            }
          }
        );
      }

      
      
  }


