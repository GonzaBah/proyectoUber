import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-ser-afiliado',
  templateUrl: './ser-afiliado.page.html',
  styleUrls: ['./ser-afiliado.page.scss'],
})
export class SerAfiliadoPage implements OnInit {
  user: Usuario;

  constructor(private router: Router, private activedRouter: ActivatedRoute) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }
    })
  }
  siguiente(){
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate(['/reg-vehiculo'], navigationExtras);
  }
  ngOnInit() {
  }

}
