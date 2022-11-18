import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';

@Component({
  selector: 'app-apirestxd',
  templateUrl: './apirestxd.page.html',
  styleUrls: ['./apirestxd.page.scss'],
})
export class ApirestxdPage implements OnInit {

  constructor(private api: ApiRestService) { }

  users: any;
  autos: any;

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users=(res);
      console.log(res);
      console.log(res[0].nombre);
      
    }, (error) => {
      console.log(error)
    });

    this.api.getAutos().subscribe((res) => {
      this.autos = res;
      console.log(res)
      console.log(res[0].patente)
    }, (error) => {
      console.log(error)
    });
  }
  

  


}
