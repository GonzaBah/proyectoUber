import { AfterContentInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';

declare var google;

const apiKey = 'AIzaSyBjdhmIFt0j7ibkLkmOxQqJUzIEdR5WvvQ';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})

export class PaginaPrincipalPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement') mapElement;
  user: Usuario;

  constructor(private menuController: MenuController, private renderer: Renderer2,  private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    
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
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,{
        center: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 8
    });

  }
  ngOnInit() {
  }

}
