///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { AfterContentInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';
import { GoogleMap } from '@capacitor/google-maps';

declare var google;

const apiKey = 'AIzaSyCS-2JaoMD350XXYsGk8zyWza9N0rHpf54';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})

export class PaginaPrincipalPage implements OnInit, AfterContentInit {

  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  user: Usuario;
  mapa!: google.maps.Map;
  markers: google.maps.Marker[];

  constructor(private menuController: MenuController, private renderer: Renderer2,  private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    this.markers = [];
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
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
        user: this.user
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
  }
  cardClick(){
    console.log("btn Clicked");
    alert("THE GAME")
  }

  ngAfterContentInit(): void{
    
    /*if (navigator.geolocation){
      Geolocation.getCurrentPosition().then((r) => {
        this.cargarMapa(r);
      })
    }else{
      console.log("Error con la Geolocalización!!");
    }
    */
    
  }

  ngOnInit() {
  }

}
