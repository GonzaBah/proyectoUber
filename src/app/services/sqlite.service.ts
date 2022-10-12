import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  listaUsuarios = new BehaviorSubject([]);
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
  RolPasaj: string = "insert or ignore into rol(idrol, nombreRol) values(1, 'Pasajero');";
  RolAfil: string = "insert or ignore into rol(idrol, nombreRol) values(2, 'Afiliado');";
  User1: string = "insert or ignore into usuario(idusuario, rut, nombre, apellido, correo, clave, id_rol) values (1, '111-1', 'User', 'Name', 'user@mail.com', '1234', 0)";
  User2: string = "insert or ignore into usuario(idusuario, rut, nombre, apellido, correo, clave, id_rol) values (2, '222-2', 'Chimba', 'Rongo', 'chimba@rongo.com', 'chimba', 1)";
  
  constructor(public sql: SQLite, private platform: Platform) { 
    this.platform.ready().then(() => {
      this.crearDB();
    }).catch(e => console.log("NO FUNCIONA!!!"))
  }
  
  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchUsers(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
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
      await this.database.executeSql(this.User1, []);
      await this.database.executeSql(this.User2, []);

      this.database.transaction((tr) => {
        tr.executeSql("select * from rol;", [], function(tr, data) {
          console.log("Valor Rol 1: "+data.rows.item(0).nombreRol)
        })
      });

      this.isDBReady.next(true);
    } catch (e) {
      console.log(e);
    }
  }
  returnUsers(){
    return this.database.executeSql('select * from usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i=0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).idusuario,
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            idRol: res.rows.item(i).id_rol
          })
        }
      }
      this.listaUsuarios.next(items);
    })
  }

  validarUser(user, pass){
    let v = 0;
    this.database.executeSql("select * from usuario", []).then((data) => {
      for (let i=0; i < data.rows.length; i++) {
        if (user == data.rows.item(i).correo && pass == data.rows.item(i).clave){
          v++;
        }
      }
    });
    
  }

  mostrarUsers(){
    //retorna todos los usuarios
    let items: Usuario[] = [];
    this.database.transaction((tr) => {
      tr.executeSql("select * from usuario", [], function(tr, data) {
        if (data.rows.length > 0) {
          for (var i=0; i < data.rows.length; i++) {
            items.push({
              id: data.rows.item(i).idusuario,
              rut: data.rows.item(i).rut,
              nombre: data.rows.item(i).nombre,
              apellido: data.rows.item(i).apellido,
              correo: data.rows.item(i).correo,
              clave: data.rows.item(i).clave,
              idRol: data.rows.item(i).id_rol
            })
          }
        }
      })
    });
    console.log("ITEMS: "+items[0].nombre)
    return items;
    
  }

  agregarUser(rut, nombre, apellido, correo, clave, id_rol) {
    let data = [rut, nombre, apellido, correo, clave, id_rol];
    return this.database.executeSql('insert into usuario(rut, nombre, apellido, correo, clave, id_rol) values (?,?,?,?,?,?)', data).then(res =>{
      this.returnUsers();
    })
  }
  editarUser(id, rut, nombre, apellido, correo, clave, id_rol) {
    let data = [rut, nombre, apellido, correo, clave, id_rol, id];
    return this.database.executeSql('update usuario set rut = ?, nombre = ?, apellido = ?, correo = ?, clave = ?, id_rol = ? where idusuario = ?', data).then(res =>{
      this.returnUsers();
    })
  }
}
