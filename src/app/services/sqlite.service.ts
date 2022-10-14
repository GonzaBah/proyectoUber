import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auto } from './auto';
import { Marca } from './marca';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  listaUsuarios = new BehaviorSubject([]);
  listaAutos = new BehaviorSubject([]);
  listaMarcas = new BehaviorSubject([]);
  //Lista de Marcas a registrar
  Marcas = ['Audi', 'Bentley', 'BMW', 'Chevrolet', 'Citroen', 'Dacia', 'Ford', 'Fiat', 'Hyundai', 'Honda', 'Infiniti', 'KIA', 'Land-Rover', 'Lexus', 'Nissan', 'Open', 'Peugeot', 'Porsche', 'Renault', 'Subaru', 'Suzuki', 'Toyota'];
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
  RolPasaj: string = "insert or ignore into rol(idrol, nombreRol) values(0, 'Pasajero');";
  RolAfil: string = "insert or ignore into rol(idrol, nombreRol) values(1, 'Afiliado');";
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

  fetchAutos(): Observable<Auto[]> {
    return this.listaAutos.asObservable();
  }
  fetchMarcas(): Observable<Marca[]> {
    return this.listaMarcas.asObservable();
  }
  crearDB() {
    this.sql.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.tablasDB();
      console.log("Listo!!");
    }).catch(e => console.log(e));
  }

  async tablasDB() {
    try {
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
      for (let i=0; i < this.Marcas.length; i++){
        await this.database.executeSql("insert or ignore into marca(idmarca, nombreMarca) values(?,?)", [i, this.Marcas[i]]);
      }
      this.returnUsers();
      this.returnMarcas();
      this.isDBReady.next(true);
    } catch (e) {
      console.log(e);
    }
  }
  returnUsers() {
    return this.database.executeSql('select * from usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
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
  returnMarcas() {
    return this.database.executeSql('select * from marca', []).then(res => {
      let items: Marca[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idmarca: res.rows.item(i).idmarca,
            nombreMarca: res.rows.item(i).nombreMarca
          })
        }
      }
      this.listaMarcas.next(items);
    })
  }
  returnAutos() {
    return this.database.executeSql('select * from auto', []).then(res => {
      let items: Auto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            annio: res.rows.item(i).annio,
            idUsuario: res.rows.item(i).id_usuario,
            idMarca: res.rows.item(i).id_marca
          })
        }
      }
      this.listaAutos.next(items);
    })
  }

  agregarUser(rut, nombre, apellido, correo, clave, id_rol) {
    let data = [rut, nombre, apellido, correo, clave, id_rol];
    return this.database.executeSql('insert into usuario(rut, nombre, apellido, correo, clave, id_rol) values (?,?,?,?,?,?)', data).then(res => {
      this.returnUsers();
    })
  }
  editarUser(id, rut, nombre, apellido, correo, clave, id_rol) {
    let data = [rut, nombre, apellido, correo, clave, id_rol, id];
    return this.database.executeSql('update usuario set rut = ?, nombre = ?, apellido = ?, correo = ?, clave = ?, id_rol = ? where idusuario = ?', data).then(res => {
      this.returnUsers();
    })
  }
  agregarAuto(patente, color, modelo, annio, idusuario, idmarca){
    let data = [patente, color, modelo, annio, idusuario, idmarca];
    return this.database.executeSql('insert into auto(patente, color, modelo, annio, id_usuario, id_marca) values (?,?,?,?,?,?)', data).then(res => {
      this.returnAutos();
    })
  }
}
