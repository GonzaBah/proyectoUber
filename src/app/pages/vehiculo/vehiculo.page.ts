import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto } from 'src/app/services/auto';
import { Marca } from 'src/app/services/marca';
import { SqliteService } from 'src/app/services/sqlite.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  user: Usuario;
  auto: Auto;
  arrayAuto: Auto[];
  arrayMarcas: Marca[];

  marca: string = "";
  varEd: boolean = true;

  constructor(private router: Router, private activedRouter: ActivatedRoute, private wayplaceDB: SqliteService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.auto = this.router.getCurrentNavigation().extras.state.auto;
      }
      
    });
    
   }
  editarVeh(){
    this.varEd = false;
  }
  async confirmEdit(){
    let pat = document.getElementById("patenteEd") as HTMLInputElement;
    let mar = document.getElementById("marcaEd") as HTMLInputElement;
    let mod = document.getElementById("modeloEd") as HTMLInputElement;
    let col = document.getElementById("colorEd") as HTMLInputElement;
    let annio = document.getElementById("annioEd") as HTMLInputElement;

    await this.wayplaceDB.editarAuto(pat.value, col.value, mod.value, parseInt(annio.value), this.user.id, parseInt(mar.value), this.auto.patente);
    this.auto = {
      patente: pat.value,
      color: col.value,
      modelo: mod.value,
      annio: parseInt(annio.value),
      idUsuario: this.user.id,
      idMarca: parseInt(mar.value),
    }

    this.varEd = true;
  }
  ngOnInit() {
    this.wayplaceDB.dbState().subscribe(res => {
      if (res) {
        this.wayplaceDB.fetchAutos().subscribe(item => {
          this.arrayAuto = item;
        });
        this.wayplaceDB.fetchMarcas().subscribe(item => {
          this.arrayMarcas = item;
        })
      }
    })
    this.marca = this.arrayMarcas[this.auto.idMarca].nombreMarca;
  }

}
