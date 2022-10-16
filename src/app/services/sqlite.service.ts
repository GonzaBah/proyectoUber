import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  //String con la creación de tablas
  tablaRol: string = "create table if not exists rol(idrol Integer Primary Key autoincrement, nombreRol VARCHAR(20) NOT NULL);";
  tablaComuna: string = "create table if not exists comuna(idcomuna Integer Primary Key autoincrement, nombreComuna VARCHAR(20) NOT NULL);";
  tablaMarca: string = "create table if not exists marca(idmarca Integer Primary Key autoincrement, nombreMarca VARCHAR(20) NOT NULL);";
  tablaUser: string = "create table if not exists usuario(idusuario Integer Primary Key autoincrement, rut VARCHAR(15) NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, correo VARCHAR(40) NOT NULL, clave VARCHAR(50) NOT NULL, id_rol Integer, foreign key(id_rol) references rol(idrol));";
  tablaAuto: string = "create table if not exists auto(patente VARCHAR(10) Primary Key, color VARCHAR(20) NOT NULL, modelo VARCHAR(40) NOT NULL, annio Integer NOT NULL, id_usuario Integer NOT NULL, id_marca Integer NOT NULL, foreign key(id_usuario) references usuario(idusuario), foreign key(id_marca) references marca(idmarca));";
  tablaViaje: string = "create table if not exists viaje(idviaje Integer Primary Key autoincrement, fechaViaje DATE NOT NULL, horaSalida VARCHAR(6) NOT NULL, asientoDisp Integer NOT NULL, monto Integer NOT NULL, salida VARCHAR(15) NOT NULL, patenteAuto VARCHAR(10), foreign key(patenteAuto) references auto(patente));";
  tablaDetViaje: string = "create table if not exists detalle_viaje(idDetalle Integer Primary Key autoincrement, status VARCHAR(15) NOT NULL, id_usuario Integer NOT NULL, id_viaje Integer NOT NULL, foreign key(id_usuario) references usuario(idusuario), foreign key(id_viaje) references viaje(idviaje));";
  tablaViajeCom: string = "create table if not exists viajeComuna(id Integer Primary Key autoincrement, id_viaje Integer, id_comuna Integer, foreign key(id_viaje) references viaje(idviaje), foreign key(id_comuna) references comuna(idcomuna));";
  //String para pobrar tablas
  RolPasaj: string = "insert or ignore into rol(nombreRol) values('Pasajero');";
  RolAfil: string = "insert or ignore into rol(nombreRol) values('Afiliado');";
  constructor(public sql: SQLite, private platform: Platform) { 
    this.platform.ready().then(() => {
      this.crearDB();
    }).catch(e => console.log("equisde no funciono la wea *quema todo*"))
  }

  crearDB(){
      this.sql.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.tablasDB();
        console.log("Listo!!");
      }).catch(e => console.log(e));
  }

  async tablasDB(){
    try{
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaMarca, []);
      await this.database.executeSql(this.tablaUser, [])
      await this.database.executeSql(this.tablaAuto, [])
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaDetViaje, []);
      await this.database.executeSql(this.tablaViajeCom, []);

      await this.database.executeSql(this.RolPasaj, []);
      await this.database.executeSql(this.RolAfil, []);

      this.database.executeSql("select * from rol;", []).then((data)=>{
        for (let i=0; i < data.rows.length; i++){
          let item: string = data.rows.item(i);
          console.log("valor rol "+i+": "+item.valueOf)
        }
      });

      this.isDBReady.next(true);
    } catch (e) {
      console.log(e);
    }
  }
  
}
