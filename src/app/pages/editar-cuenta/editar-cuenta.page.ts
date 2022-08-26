import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.page.html',
  styleUrls: ['./editar-cuenta.page.scss'],
})
export class EditarCuentaPage implements OnInit {
  varEd: number = 0;
  //Variables a modificar
  nom: string = "Pepito Fuentes";
  correo: string = "PepitoF@gmail.com";
  fono: string = "+56 9 6829 3214";
  pass: string = "********";
  
  constructor() { }

  ngOnInit() {
  }
  editarPf(){
    this.varEd = 1;
  }
  confirmPf(){
    let text1 = document.getElementById('nom2') as HTMLInputElement;
    let text2 = document.getElementById('mail2') as HTMLInputElement;
    let text3 = document.getElementById('fono2') as HTMLInputElement;
    let text4 = document.getElementById('pass2') as HTMLInputElement;

    this.nom = text1.value;
    this.correo = text2.value;
    this.fono = text3.value;
    this.pass = text4.value;
    
    this.varEd = 0;
  }
}
