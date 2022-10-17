import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CamaraApiService } from 'src/app/services/camara-api.service';
///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { FormControl, FormGroup } from '@angular/forms'
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { alertController } from '@ionic/core';

declare var google: any;
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})

export class PaginaPrincipalPage implements OnInit {
  u: string = "";
  p: string = "";
  a: boolean = false;
  n: string = "";
  f: string = "";
  r: string = "";
  fe: string = "";

  @ViewChild('divMap') divMap!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  
  constructor(private menuController: MenuController, private router: Router, private activedRouter: ActivatedRoute, 
    public photo: CamaraApiService, private renderer: Renderer2, private GeoLocalizacion: Geolocation) {
      this.markers = [];

    this.activedRouter.queryParams.subscribe(params =>{
      if(!this.router.getCurrentNavigation().extras.state.user && this.router.getCurrentNavigation().extras.state.afil){
        this.a = this.router.getCurrentNavigation().extras.state.afil;
      }
      else if(this.router.getCurrentNavigation().extras.state){
        this.u = this.router.getCurrentNavigation().extras.state.user;
        this.p = this.router.getCurrentNavigation().extras.state.pass;
        this.a = this.router.getCurrentNavigation().extras.state.afil;
        this.n = this.router.getCurrentNavigation().extras.state.name;
        this.f = this.router.getCurrentNavigation().extras.state.fono;
        this.r = this.router.getCurrentNavigation().extras.state.rut;
        this.fe = this.router.getCurrentNavigation().extras.state.fech;
      }
    })
   }
  openMenu(){
    this.menuController.enable(true, 'menuConductor');
    this.menuController.open("menuConductor");
  }
  closeMenu(){
    this.menuController.close("MenuConductor");
  }
  abrirViajes(tipo: number){
    let navigationExtras: NavigationExtras = {
      state: {
        tipo: tipo,
      }
    }
    this.router.navigate(['/viajes'], navigationExtras);
  }
  abrirPerfil(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.u,
        pass: this.p,
        afil: this.a,
        name: this.n,
        fono: this.f,
        rut: this.r,
        fech: this.fe
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
  }
  cardClick(){
    console.log("btn Clicked");
    alert("THE GAME")
  }

  addPhoto(){
    this.photo.takePicture();
  }

  ngOnInit() {
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

  ngAfterViewInit(): void {

    this.GeoLocalizacion.getCurrentPosition().then((r) => {

      this.cargarMapa(r)

      // this.Autocompleto()

    })
  };

}
