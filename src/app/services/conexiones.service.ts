import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionModel } from '../model/conexion.model';
import { UsuarioModel } from '../model/usuario.model';
import { VersionModel } from 'src/app/model/version.model';
import { map } from 'rxjs/operators';
import { TicketModel } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class ConexionesService {
private url = 'https://mantenedor-77567.firebaseio.com';

constructor(private http: HttpClient) { }

getDato(dir: string, id: string) {
 return this.http.get(`${this.url}/${dir}/${id}.json`);
}

borrarDato(dir, id: string) {
  return this.http.delete(`${this.url}/${dir}/${id}.json`);
}

actualizarTicket(ticket: TicketModel, ruta) {
  return this.http.put(`${ this.url }/${ruta}.json`, ticket);
 }


getDatos(ruta) {
  return this.http.get(`${this.url}/${ruta}.json`)
            .pipe(
              map( resp => this.crearArreglo(resp) )
            );
}

getDatosFiltrados(ruta, filtro) {
  console.log('ruta', `${this.url}/${ruta}.json?${filtro}`);
  return this.http.get(`${this.url}/${ruta}.json?${filtro}`)
            .pipe(
              map( resp => this.crearArreglo(resp) )
            );
}

public crearArreglo(dato: object) {
  const arreglo = [];
  Object.keys(dato).forEach( key => {
    const elemento = dato[key];
    elemento.id = key;
    arreglo.push( elemento );
  });
  return arreglo;
}


guardarDato(ruta: string, body: any) {
  return this.http.post(`${ this.url }/${ ruta }.json`, body)
             .pipe(
               map(( resp: any ) => {
                 body.id = resp.name;
                 return body;
               })
             );
 }

 actualizarDato(ruta: string, id: string, body: any) {
  return this.http.put(`${ this.url }/${ruta}/${id}.json`, body);
 }


/////////////////////////// CONEXIONES  //////////////////////////
getConexiones() {
  return this.http.get(`${this.url}/Conexiones.json`)
            .pipe(
              map( resp => this.crearArregloConexiones(resp) )
            );
}

crearConexion(conexion: ConexionModel ) {
  return this.http.post(`${ this.url }/Conexiones.json`, conexion)
             .pipe(
               map(( resp: any ) => {
                 conexion.id = resp.name;
                 return conexion;
               })
             );
 }

 actualizarConexion( conexion: ConexionModel) {
   // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
   const conexionTemp = {
     ...conexion
   };
   delete conexionTemp.id;
   return this.http.put(`${this.url}/Conexiones/${conexion.id}.json`, conexionTemp);
 }


private crearArregloConexiones(Obj: object) {

  const conexiones: ConexionModel[] = [];

  if ( Obj === null ) { return []; }


  Object.keys( Obj ).forEach( key => {
    const conexion: ConexionModel = Obj[key];
    conexion.id = key;
    conexiones.push( conexion);
  });
  return conexiones;
}

getNoticias() {
}


 /////////////////////////// USUARIOS //////////////////////////

 getUsuarios() {
  return this.http.get(`${this.url}/Usuarios.json`)
            .pipe(
              map( resp => this.crearArregloUsuarios(resp) )
            );
}



private crearArregloUsuarios(Obj: object) {

  const usuarios: UsuarioModel[] = [];

  if ( Obj === null ) { return []; }

  Object.keys( Obj ).forEach( key => {
    const usuario: UsuarioModel = Obj[key];
    usuario.id = key;
    usuarios.push( usuario);
  });
  return usuarios;
}



crearUsuario(usuario: UsuarioModel ) {
  return this.http.post(`${ this.url }/Usuarios.json`, usuario)
             .pipe(
               map(( resp: any ) => {
                 usuario.id = resp.name;
                 return usuario;
               })
             );
 }

 actualizarUsuario( usuario: UsuarioModel) {
   // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
   const usuarioTemp = {
     ...usuario
   };
   delete usuarioTemp.id;
   return this.http.put(`${this.url}/Usuarios/${usuario.id}.json`, usuarioTemp);
 }



///////////////////////////// VERSIONES //////////////////////


getVersiones() {
  return this.http.get(`${this.url}/Versiones.json`)
            .pipe(
              map( resp => this.crearArregloVersiones(resp) )
            );
}

private crearArregloVersiones(Obj: object) {

  const versiones: VersionModel[] = [];

  if ( Obj === null ) { return []; }

  Object.keys( Obj ).forEach( key => {
    const version: VersionModel = Obj[key];
    version.id = key;
    versiones.push( version);
  });
  return versiones;
}

crearVersion(version: VersionModel ) {
  return this.http.post(`${ this.url }/Versiones.json`, version)
             .pipe(
               map(( resp: any ) => {
                 version.id = resp.name;
                 return version;
               })
             );
 }

 actualizarVersion( version: VersionModel) {
   // esto es para traer el objeto y borrarle el id para no grabarlo como campo.
   const versionTemp = {
     ...version
   };
   delete versionTemp.id;
   return this.http.put(`${this.url}/Versiones/${version.id}.json`, versionTemp);
 }






 apiFinansas() {
  return this.http.get('https://mindicador.cl/api');
 }


 ////////////////// CLIENTES ///////////
 getClientes() {
   return  this.http.get('http://apipdv.clubgournet.cl/api/v1/ventasdiarias/empresas');
 }



 sonido(sonido) {
  const audio = new Audio();
  audio.src = `./assets/sounds/${sonido}`;
  audio.play();
}

}
