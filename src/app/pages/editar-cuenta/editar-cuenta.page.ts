import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaraApiService } from 'src/app/services/camara-api.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {
  varEd: number = 0;
  //Variables a modificar
  u: string = "";
  p: string = "";
  a: boolean = false;
  n: string = "";
  f: string = "";
  foto: any;

  
  constructor(private router: Router, private activedRouter: ActivatedRoute, private photoService: CamaraApiService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.u = this.router.getCurrentNavigation().extras.state.user;
        this.p = this.router.getCurrentNavigation().extras.state.pass;
        this.a = this.router.getCurrentNavigation().extras.state.afil;
        this.n = this.router.getCurrentNavigation().extras.state.name;
        this.f = this.router.getCurrentNavigation().extras.state.fono;
      }
    })
   }
  
  tomarFoto(){
    this.photoService.takePicture();
  }

  ngOnInit() {
    this.photoService.fetchFoto().subscribe(res=>{
      this.foto = res;
    }
    )
  }
  editarPf(){
    this.varEd = 1;
  }
  confirmPf(){
    let text1 = document.getElementById('nom2') as HTMLInputElement;
    let text2 = document.getElementById('mail2') as HTMLInputElement;
    let text3 = document.getElementById('fono2') as HTMLInputElement;
    let text4 = document.getElementById('pass2') as HTMLInputElement;

    this.n = text1.value;
    this.u = text2.value;
    this.f = text3.value;
    this.p = text4.value;
    
    this.varEd = 0;
  }
}
