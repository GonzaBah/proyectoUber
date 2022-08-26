import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {

  constructor() { }

  cardClick(){
    console.log("btn Clicked");
    alert("THE GAME")
  }

  ngOnInit() {
  }

}
