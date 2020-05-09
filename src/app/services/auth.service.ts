import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) {
  }

  logout() {
    localStorage.removeItem('token');
    if ( localStorage.getItem('usuarioM')) {
     const usuario = { mail: JSON.parse(localStorage.getItem('usuarioM')).mail,
                        nivel: 0,
                        nombre: '',
                        password: '',
                        id: '',
                        cliente: '',
                        sala: ''
                      };

     localStorage.setItem('usuarioM', JSON.stringify(usuario));
    }
  }

  esAdmin() {
    const usuario = JSON.parse(localStorage.getItem('usuarioM'));
    if ( usuario.nivel === 3 ) {
      return true;
    } else {
      return false;
    }
  }

  estaAutenticado(): boolean {
    // console.log('aqui', localStorage.getItem('usuarioM'));
    if ( localStorage.getItem('usuarioM')) {
      return true;
    } else {
      return false;
    }

    // const expira = Number(localStorage.getItem('expira'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);

    // if (expiraDate > new Date() ) {
    //   console.log('token aun valido');
    //   return true;
    // } else {
    //   console.log('token caduco');
    //   return false;
    // }
  }


  // estaAutenticado(): boolean {
  //   if (localStorage.getItem('usuario') || localStorage.getItem('empresa') ) {
  //     return true;
  //   }


}
